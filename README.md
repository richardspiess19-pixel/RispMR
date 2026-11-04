# VR Box → Joy-Con

App Android que pega um controle Bluetooth **VR Box** (aquele controlinho que vem com os óculos
VR de celular) e transforma os botões dele em **dois Joy-Cons virtuais**, esquerdo e direito:

- **Joy-Con esquerdo**: analógico, setas ↑ ↓ ← →, −, Captura, L e ZL.
- **Joy-Con direito**: analógico, A, B, X, Y, +, Home, R e ZR.

Por padrão, os botões A, B, C e D do VR Box viram A, B, X e Y, os gatilhos viram ZR e R, e o @ vira +.
"Joy-Con" descreve o layout; o app não é da Nintendo nem se passa por um Joy-Con de verdade.

Com o **Modo jogo**, o app cria um **controle de jogo virtual** (com o app
[Shizuku](https://shizuku.rikka.app)) e o Android entrega esse controle para todos os jogos do
celular, com os botões do seu mapeamento. Enquanto o jogo está aberto, o VR Box é lido pelo
Shizuku (APK principal) ou pelo serviço de acessibilidade (APK com acessibilidade).

## Como usar

1. Pareie o VR Box no Bluetooth do celular.
2. Abra o app. Ele fica bloqueado até o [Shizuku](https://shizuku.rikka.app) estar ligado e
   permitir o app: a tela inicial mostra o passo a passo. Depois, toque em **Conectar controle**.
3. Em **Configurar**, aperte cada botão do controle quando o app pedir.
4. Toque em **Iniciar emulação** e abra o jogo.

O APK principal (`app-shizuku`) só precisa do Shizuku e não é bloqueado pelo Play Protect. Existe
também um APK com acessibilidade (`app-acessibilidade`). Detalhes em [docs/INSTALLATION.md](docs/INSTALLATION.md).

## Versão web (um arquivo HTML)

`npm run build:web` gera `dist/vr-box-to-joycon.html`, um arquivo único que abre no Chrome do
celular sem instalar nada. Ele lê o VR Box pelo navegador (modo gamepad pelo Gamepad API; modos
mouse e teclado pelos eventos da página) e tem detecção, mapeamento, controles virtuais, teste e
perfis (salvos no navegador, com exportar/importar). O **Modo jogo não existe na versão web**:
uma página não pode tocar na tela de outros apps. Monte o perfil no HTML, exporte e importe no
app se quiser usar nos jogos.

## O que o app faz

- Encontra o VR Box e mostra como o Android enxerga ele (mouse, teclado ou gamepad).
- Detecta cada botão apertado e solto, o movimento do mouse e os eixos do joystick.
- Liga qualquer botão do VR Box a qualquer comando dos dois controles virtuais.
- Converte o movimento do mouse em joystick, com dois modos e ajuste de sensibilidade,
  zona morta, curva, suavização, retorno ao centro, inversão e limite.
- Mostra os controles virtuais em tempo real e tem uma tela de teste com taxa e atraso.
- Guarda perfis (criar, renomear, duplicar, exportar, importar).
- **Modo jogo**: os dois Joy-Cons chegam nos jogos do celular juntos, como um controle de jogo
  (Shizuku cria o controle em `/dev/uhid`; a acessibilidade lê o VR Box com o jogo aberto).
- Opcional: manda o estado dos controles pela rede (UDP) para outros programas.
- Modo demonstração, para testar sem o controle.

## O que não dá para fazer

Os jogos do celular recebem um **controle de jogo comum** com o layout dos dois Joy-Cons juntos
(setas = D-pad, L/R, ZL/ZR, −/+, Home). O app não se passa por um Joy-Con da Nintendo: um Switch
ou um PC não enxergam o VR Box como Joy-Con. Criar o controle precisa do Shizuku (permissão do ADB). Explicação completa em [docs/LIMITATIONS.md](docs/LIMITATIONS.md).

## Compilar

```bash
cd android
./gradlew assembleDebug        # APK em android/app/build/outputs/apk/debug/app-debug.apk
./gradlew testDebugUnitTest    # testes
cd .. && npm test              # testes da interface e do motor web
npm run test:web               # gera o HTML e testa no Chromium
```

## Pastas

```
frontend/      interface (HTML, CSS, JavaScript)
android/       app Android em Kotlin
config/        perfis que vêm com o app
integration/   protocolo de rede VRBQ, exemplos em C e Python, pesquisa sobre OpenXR
docs/          instalação, arquitetura, compatibilidade, limitações, testes
tests/         testes da interface
web/           versão web: motor em JavaScript, backend do navegador e build do HTML
```

O logo fica em `frontend/assets/logo.svg` e o ícone em
`android/app/src/main/res/drawable/ic_launcher_foreground.xml`; para usar outro, é só trocar os
arquivos. Fonte do logo: Chakra Petch (licença SIL OFL 1.1).
