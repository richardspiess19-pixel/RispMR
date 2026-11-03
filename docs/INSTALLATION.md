# Instalação e compilação

## Instalar o APK pronto

1. Baixe `app-debug.apk` (artefato do GitHub Actions `android` ou gerado localmente).
2. No telefone, permita "instalar apps desconhecidos" para o app que abrirá o arquivo.
3. Abra o APK e instale. Requer **Android 8.0 (API 26)** ou superior.

> O APK de debug é assinado com a chave de depuração local. Para distribuição use o build de
> release assinado (abaixo).

## Primeiro uso

1. Ligue o VR Box (geralmente segurar `@`/power por ~3 s) e escolha o modo (`@`+`A`/`B`/`C`/`D`,
   varia por modelo).
2. Android → Configurações → Bluetooth → parear "VR BOX" (ou "VR-PARK", etc.).
3. Abra o app → **CONNECT CONTROLLER**. O app seleciona o controle (ou abre o Device Manager).
4. Opcional: conceda a permissão "Dispositivos próximos" para ver detalhes Bluetooth.
5. **Detect** → pressione cada botão do VR Box → **Assign to virtual input**.
6. **Mapping** → ajuste, **LEARN**, **SAVE**.
7. **Tester** / **Controllers** → confira os estados.
8. **VR Integration** → habilite a saída UDP (host/porta do app receptor) → **START EMULATION**.

## Compilar

Pré-requisitos: JDK 17+ (testado com 21), Android SDK com `platforms;android-35` e
`build-tools;35.0.0`. Gradle é baixado pelo wrapper.

```bash
cd android
echo "sdk.dir=/caminho/para/Android/Sdk" > local.properties   # ou exporte ANDROID_HOME
./gradlew assembleDebug          # app/build/outputs/apk/debug/app-debug.apk
./gradlew testDebugUnitTest      # testes JVM + Robolectric
./gradlew lintDebug
```

A tarefa `syncWebAssets` copia `../frontend` → `assets/www` e `../config` → `assets/config`
antes de cada build; edite a interface em `frontend/` e recompile.

### Release assinado

Crie `android/keystore.properties` (não versionado):

```properties
storeFile=release.jks
storePassword=********
keyAlias=vrbq
keyPassword=********
```

```bash
keytool -genkeypair -v -keystore android/release.jks -alias vrbq -keyalg RSA -keysize 4096 -validity 10000
./gradlew assembleRelease        # app/build/outputs/apk/release/app-release.apk
```

Sem `keystore.properties`, `assembleRelease` gera `app-release-unsigned.apk` (R8 ativado).

## Desenvolvimento da interface no navegador

```bash
npx http-server frontend      # ou qualquer servidor estático
```

Sem o app Android a interface mostra **"Browser preview"**: nada é simulado e os comandos
informam que só funcionam no app. Os testes de UI usam um mock **apenas de teste**
(`tests/frontend/mock-native.js`), nunca incluído no APK.
