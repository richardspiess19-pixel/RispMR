# Integração com runtimes e jogos

Status: **não disponível ainda** (projetos). O que existe hoje é o protocolo VRBQ
(`../InputProtocol`), implementado e testado. Os caminhos abaixo consomem esse protocolo.

## A. App/jogo próprio (mais simples, viável hoje)

Unity, Godot ou nativo: abra um socket UDP na porta 47900, decodifique VRBQ e trate os valores
como entrada do jogador. Referências: `../InputProtocol/receiver/vrbq_receiver.py` e
`../InputProtocol/c/vrbq_protocol.h`.

## B. Camada OpenXR "vrbq_input_layer" (exige empacotar com o jogo)

Projeto:

1. Camada implícita com manifesto JSON padrão do OpenXR, distribuída junto ao APK do jogo.
2. Intercepta `xrSuggestInteractionProfileBindings` e registra quais ações estão ligadas a
   `/interaction_profiles/oculus/touch_controller`.
3. Uma thread recebe VRBQ (binário) e mantém o último estado.
4. Intercepta `xrGetActionStateBoolean/Float/Vector2f` e devolve os valores VRBQ para as ações
   correspondentes (tabela em `../InputProtocol/PROTOCOL.md`), com `isActive = true`.
5. `xrGetCurrentInteractionProfile` retorna o perfil Touch quando VRBQ estiver `connected`.
6. Poses ficam com o comportamento do runtime (sem rastreamento).

Limitações: só funciona em jogos que você possa reempacotar; não altera jogos da loja.

## C. Driver para runtime aberto (Monado) ou SteamVR

Um driver que leia VRBQ e exponha dois controles. Requer que esse runtime seja o runtime ativo
(PC com SteamVR/Monado, ou Monado em Android junto com um headset) — fora do escopo deste app.

## D. Telefone como gamepad Bluetooth (`BluetoothHidDevice`)

Registrar um descritor HID de gamepad e conectar a um PC/headset. Resultado: gamepad genérico
(não Touch). Depende do fabricante manter o perfil HID Device.
