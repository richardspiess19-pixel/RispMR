import java.util.Properties
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

// Optional release signing: create android/keystore.properties (never commit it) with
// storeFile, storePassword, keyAlias, keyPassword. Without it, assembleRelease produces an
// unsigned APK and assembleDebug a debug-signed APK.
val keystoreProps = Properties().apply {
    val f = rootProject.file("keystore.properties")
    if (f.exists()) f.inputStream().use { load(it) }
}

// The web UI (../frontend) and the default profiles (../config) live outside the Android
// project so they can be developed and tested independently. They are copied into the APK
// assets at build time: assets/www/** and assets/config/*.json.
val webAssetsDir = layout.buildDirectory.dir("generated/vrbq-assets")
val syncWebAssets by tasks.registering(Sync::class) {
    from(rootProject.file("../frontend")) { into("www") }
    from(rootProject.file("../config")) { into("config") }
    into(webAssetsDir)
}

android {
    namespace = "com.rispmr.vrboxemulator"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.rispmr.vrboxemulator"
        minSdk = 26 // Android 8.0: pointer capture API
        targetSdk = 35
        versionCode = 10
        versionName = "0.6.2"
    }

    signingConfigs {
        if (keystoreProps.getProperty("storeFile") != null) {
            create("release") {
                storeFile = rootProject.file(keystoreProps.getProperty("storeFile"))
                storePassword = keystoreProps.getProperty("storePassword")
                keyAlias = keystoreProps.getProperty("keyAlias")
                keyPassword = keystoreProps.getProperty("keyPassword")
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfigs.findByName("release")?.let { signingConfig = it }
        }
    }

    // The virtual gamepad service talks to the Shizuku process through AIDL.
    buildFeatures {
        aidl = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    sourceSets["main"].assets.srcDir(webAssetsDir)

    testOptions {
        unitTests.isIncludeAndroidResources = true
        unitTests.all {
            it.systemProperty("vrbq.configDir", rootProject.file("../config").absolutePath)
            it.systemProperty("vrbq.fixturesDir", rootProject.file("../integration/InputProtocol/fixtures").absolutePath)
        }
    }

    lint {
        abortOnError = true
        warningsAsErrors = false
    }
}

kotlin {
    compilerOptions {
        jvmTarget.set(JvmTarget.JVM_17)
    }
}

tasks.named("preBuild") { dependsOn(syncWebAssets) }

dependencies {
    implementation("androidx.webkit:webkit:1.12.1")
    // Shizuku: runs the virtual gamepad service with ADB (shell) rights. https://shizuku.rikka.app
    implementation("dev.rikka.shizuku:api:13.1.5")
    implementation("dev.rikka.shizuku:provider:13.1.5")

    testImplementation("junit:junit:4.13.2")
    testImplementation("org.json:json:20240303")
    testImplementation("org.robolectric:robolectric:4.14.1")
}
