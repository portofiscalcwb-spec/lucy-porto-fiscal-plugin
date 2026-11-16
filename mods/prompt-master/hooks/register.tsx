import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

const isOn = atom({ plugin: 'prompt-master', key: 'isOn' } as const, true)

const MIN_CHARS = 20

const SYSTEM = `Você é um editor de prompts. Recebe o prompt que uma pessoa vai enviar a um assistente de programação e devolve uma versão melhor do mesmo pedido.

Regras:
- Preserve a intenção, todos os fatos, nomes, caminhos de arquivo, trechos de código e restrições do original.
- Não invente requisitos, arquivos ou detalhes que a pessoa não deu.
- Deixe o objetivo claro, organize o pedido e diga o que conta como pronto quando isso já estiver implícito.
- Escreva na mesma língua do original, na voz da pessoa (primeira pessoa).
- Se o prompt já estiver claro, ou for uma resposta curta a uma pergunta, devolva-o sem mudar.
- Responda só com o prompt reescrito, sem comentário, sem aspas, sem título.`

export const register: Register = on => {
  on('prompt.submit', async ($, e, next) => {
    const isTyped = e.origin.kind === 'composer' || e.origin.kind === 'bridge'
    const text = e.text.trim()

    if (!isTyped || e.command || e.isMeta || text.length < MIN_CHARS || !(await read($, isOn))) {
      return next(e)
    }

    $.ui.status('Prompt Master: reescrevendo…')
    const reply = await $.model.complete({
      model: 'haiku',
      system: SYSTEM,
      prompt: `<prompt>\n${text}\n</prompt>`,
      maxTokens: 2000,
      effort: 'low',
      timeoutMs: 20000,
    })
    $.ui.status(undefined)

    const rewritten = reply.isAnswered ? reply.text.trim() : ''

    if (!rewritten) {
      $.ui.toast('Prompt Master: não consegui reescrever, enviei o original')

      return next(e)
    }

    return next({ ...e, text: rewritten })
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }

    const { Box, Button, Text } = $.ui.resolve(e)
    const active = await read($, isOn)

    return (
      <Box>
        <Button
          key="toggle"
          label="✦ Prompt Master"
          variant={active ? 'primary' : 'secondary'}
          onPress={() => update($, isOn, v => !v)}
        />
        <Text dimColor>{active ? ' ligado: reescreve ao enviar' : ' desligado'}</Text>
      </Box>
    )
  })
}
