# Prompt Master

Mod do Claude Code que reescreve o seu prompt antes de ele entrar na conversa e
mostra um botão `✦ Prompt Master` na faixa acima da caixa de texto.

É um plugin separado da Lucy Porto Fiscal: ele roda código (um módulo de hooks) e,
quando ligado, envia o texto do prompt a um modelo rápido do Claude (Haiku) para a
reescrita, dentro da sua própria sessão do Claude Code.

## Como funciona

- Com o botão ligado (padrão), cada prompt digitado é reescrito para ficar mais
  claro, preservando a intenção, os fatos e a língua do original.
- O botão liga e desliga a reescrita.
- Não são reescritos: comandos com `/`, prompts com menos de 20 caracteres e
  mensagens que não foram digitadas por você.
- Se a reescrita falhar ou passar de 20 segundos, o prompt original é enviado.

## Instalação

No prompt de uma sessão do Claude Code no terminal:

```
/plugin install prompt-master --marketplace portofiscalcwb-spec/lucy-porto-fiscal-plugin
```

Responda `y` para adicionar o marketplace e escolha o escopo.

Pelo shell:

```
claude plugin install prompt-master --marketplace portofiscalcwb-spec/lucy-porto-fiscal-plugin
```
