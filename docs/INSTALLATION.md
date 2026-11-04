# Instalação

Requer **Android 8.0** ou mais novo.

## O aviso do Play Protect

Desde **30 de setembro de 2026**, no Brasil, o Android bloqueia a instalação de apps de
**desenvolvedores não verificados** pelo Google. Este APK foi compilado aqui, sem uma conta de
desenvolvedor verificada, então o celular pode mostrar um bloqueio de verificação.

Isso é uma regra do sistema na hora de instalar; **não dá para tirar de dentro do app**. Existem
três caminhos oficiais:

### 1. Instalar pelo computador com ADB (mais simples)

Instalações por ADB não passam pela verificação.

1. No celular: Configurações → Sobre o telefone → toque 7 vezes em "Número da versão" para
   liberar as **Opções do desenvolvedor**.
2. Em Opções do desenvolvedor, ative **Depuração USB**.
3. No computador, instale o [Android Platform Tools](https://developer.android.com/tools/releases/platform-tools)
   e ligue o celular no cabo (aceite a pergunta que aparece na tela do celular).
4. Rode:

   ```bash
   adb install vr-box-to-joycon.apk
   ```

### 2. "Fluxo avançado" do Android (sem computador)

O Google liberou um caminho para quem quer instalar apps não verificados por conta própria: fica
nas **Opções do desenvolvedor**, pede confirmação, reinício do celular e uma espera de 24 horas
(só na primeira vez). Depois disso a instalação pelo arquivo funciona.

### 3. Registrar a sua conta de desenvolvedor

Se você vai distribuir o app, registre-se no Android Developer Console (existe uma conta
gratuita para distribuição limitada, pensada para estudantes e hobby). Registre o pacote
`com.rispmr.vrboxemulator` e compile o release com a **sua** chave (veja "Release assinado").

### Acessibilidade (para ler o VR Box com o jogo aberto)

Com o jogo na frente, o Android só entrega os botões do VR Box para outro app pelo **serviço de
acessibilidade**. O app usa esse serviço só para ler o VR Box escolhido; não lê a tela e não toca
nela. No Brasil, o Play Protect pode barrar apps com acessibilidade instalados pelo navegador ou
pelo gerenciador de arquivos: **instalar por ADB evita o bloqueio**.

Depois de instalar (Android 13 ou mais novo), a acessibilidade pode mostrar **"Configuração
restrita"**. Tente ativar uma vez, depois vá em Configurações → Apps → VR Box → Joy-Con → ⋮ →
**Permitir configurações restritas**, confirme com a senha, volte em Acessibilidade e ative
"VR Box → Joy-Con: Modo jogo". Sem a acessibilidade, o app tenta ler o VR Box pelo Shizuku
(experimental).

Com a acessibilidade, o joystick do VR Box precisa mandar **setas/teclas** (modos teclado/música):
o Android não entrega o joystick analógico (modo gamepad) para a acessibilidade sem engolir também
o do controle virtual.

## Primeiro uso

1. Ligue o VR Box (normalmente segurando o `@` por 3 segundos). Qualquer modo funciona.
2. Pareie no Bluetooth do celular e abra o app: ele pede o Shizuku (veja abaixo).
3. **Conectar controle** → **Configurar** → aperte cada botão quando o app pedir → **Salvar**.
4. **Iniciar emulação** → abra o jogo.

### Controle virtual (Shizuku)

O Android só deixa criar um controle que os outros apps enxergam com a permissão do ADB. O app
[Shizuku](https://shizuku.rikka.app) entrega essa permissão sem computador (Android 11+). Por isso
o app Android abre bloqueado, mostrando estes passos, e só libera depois que o Shizuku permite:

1. Instale o **Shizuku** pela Play Store.
2. Em Configurações → Sobre o telefone, toque 7 vezes em **Número da versão**.
3. Em Opções do desenvolvedor, ative **Depuração por Wi-Fi**.
4. No Shizuku, toque em **Parear**, digite o código da Depuração por Wi-Fi e depois em **Iniciar**.
5. No app, toque em **Permitir**.
6. **Iniciar emulação**: os jogos passam a ver o controle **"VR Box -> Joy-Con (controle virtual)"**.

O Shizuku para quando o celular reinicia: repita o passo 4. Com o jogo na frente, o serviço do app
no Shizuku lê o VR Box direto do kernel e o "segura" (EVIOCGRAB), então o jogo só vê o controle
virtual. Se o celular não deixar segurar, o app avisa: o jogo vê os dois controles.

## Compilar

Precisa de JDK 17+ e do Android SDK (`platforms;android-35`, `build-tools;35.0.0`).

```bash
cd android
echo "sdk.dir=/caminho/para/Android/Sdk" > local.properties
./gradlew assembleDebug          # app/build/outputs/apk/debug/app-debug.apk
./gradlew testDebugUnitTest
```

A interface (`frontend/`) e os perfis (`config/`) são copiados para dentro do APK em cada build.

### Release assinado

Crie `android/keystore.properties` (não vai para o Git):

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

Guarde o `release.jks` com cuidado: atualizações do app precisam da mesma chave.

No GitHub Actions, o release é assinado se existirem os secrets `KEYSTORE_BASE64`,
`KEYSTORE_PASSWORD`, `KEY_ALIAS` e `KEY_PASSWORD`.

## Versão web (sem instalar)

1. Gere o arquivo: `npm install && npm run build:web` → `dist/vr-box-to-joycon.html`.
2. Copie para o celular e abra no **Chrome** (pelo gerenciador de arquivos: Abrir com → Chrome).
3. VR Box em modo gamepad: aperte um botão com a página aberta para o Chrome mostrar o controle.
   Em modo mouse/teclado: tela Controle → "Teclado e mouse" → Usar.

Se o Chrome não mostrar o controle ao abrir o arquivo, sirva a pasta `dist/` por HTTPS (ou
`localhost`): o Gamepad API só funciona em contexto seguro.

## Mexer na interface pelo navegador

Sirva a pasta `frontend/` com qualquer servidor estático. Sem o app Android, a interface mostra
"Prévia no navegador" e nada é simulado.
