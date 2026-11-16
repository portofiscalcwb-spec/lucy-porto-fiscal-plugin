export type PromptMasterIsOn = boolean

declare module 'claude-code' {
  interface PluginState {
    'prompt-master': { isOn: boolean }
  }
}
