# VR Box → Quest

App Android que pega um controle Bluetooth **VR Box** (aquele controlinho que vem com os óculos
VR de celular) e transforma os botões dele em dois controles no estilo **Meta Quest Touch** —
esquerdo e direito, com joystick, gatilho, grip e botões A/B/X/Y.

Com o **Modo jogo**, o jogo aberto no celular recebe esses comandos de um de dois jeitos:

- **Controle virtual** (com o app [Shizuku](https://shizuku.rikka.app)): o app cria um controle de
  jogo de verdade e o Android entrega esse controle para todos os jogos, com os botões do seu
  mapeamento.
- **Toques na tela**: cada botão toca num ponto da tela. Serve para jogos de Cardboard e jogos sem
  suporte a controle.

## Como usar

1. Pareie o VR Box no Bluetooth do celular.
2. Abra o app e toque em **Conectar controle**.
3. Em **Detectar botões**, aperte cada botão do controle e escolha o que ele faz.
4. Em **Modo jogo**, ative o serviço de acessibilidade e escolha **Controle virtual** (ligue o
   Shizuku e permita o app) ou **Toques na tela** (marque onde cada botão toca).
5. Toque em **Iniciar emulação** e abra o jogo.

Detalhes da instalação, inclusive o aviso do Play Protect, em [docs/INSTALLATION.md](docs/INSTALLATION.md).

## Versão web (um arquivo HTML)

`npm run build:web` gera `dist/vr-box-to-quest.html`, um arquivo único que abre no Chrome do
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
- **Modo jogo**: controle virtual para todos os jogos (Shizuku + `/dev/uhid`) ou toques na tela
  do jogo pelo serviço de acessibilidade.
- Opcional: manda o estado dos controles pela rede (UDP) para outros programas.
- Modo demonstração, para testar sem o controle.

## O que não dá para fazer

Um app comum de celular **não consegue** registrar controles Quest de verdade para outros jogos:
quem cria controles no OpenXR é o sistema do headset. Para os jogos do celular, o app cria um
controle de jogo comum (precisa do Shizuku, que dá a permissão do ADB) ou usa toques na tela. Explicação completa em [docs/LIMITATIONS.md](docs/LIMITATIONS.md).

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
