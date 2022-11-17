import "@logseq/libs"
import { setup, t } from "logseq-l10n"
import { render } from "preact"
import SmartSearchInput from "./comps/SmartSearchInput"
import zhCN from "./translations/zh-CN.json"

const INPUT_ID = "kef-ac-input"

let inputContainer
let inputContainerParent
let textarea
let lastBlock

async function main() {
  await setup({ builtinTranslations: { "zh-CN": zhCN } })

  provideStyles()

  logseq.useSettingsSchema([
    {
      key: "shortcut",
      type: "string",
      default: "ctrl+space",
      description: t("Shortcut key to trigger the smartsearch input."),
    },
    {
      key: "filter_mode",
      type: "enum",
      default: "fuzzy",
      enumPicker: "select",
      enumChoices: [
        "fuzzy",
        "simple",
      ],
      description: "How should the filter work?",
      title: "Filter mode",
    },
  ])

  logseq.provideUI({
    key: INPUT_ID,
    path: "#app-container",
    template: `<div id="${INPUT_ID}"></div>`,
  })

  if (logseq.settings?.shortcut) {
    logseq.App.registerCommandPalette(
      {
        key: "trigger-input",
        label: t("Trigger smartsearch input"),
        keybinding: { binding: logseq.settings?.shortcut },
      },
      triggerInput,
    )
  } else {
    logseq.App.registerCommandPalette(
      { key: "trigger-input", label: t("Trigger smartsearch input") },
      triggerInput,
    )
  }

  // Let div root element get generated first.
  setTimeout(async () => {
    inputContainer = parent.document.getElementById(INPUT_ID)
    inputContainerParent = inputContainer.parentNode
    render(<SmartSearchInput onClose={closeInput} />, inputContainer)
  }, 0)

  // logseq.beforeunload(() => {})

  console.log("#smartsearch loaded")
}

function provideStyles() {
  logseq.provideStyle(`
    #${INPUT_ID} {
      position: absolute;
      top: 95%;
      left: 0;
      z-index: var(--ls-z-index-level-2);
      display: none;
    }
    .kef-ac-container {
      background: var(--ls-primary-background-color);
      box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);
      min-width: 300px;
      max-width: 800px;
    }
    .kef-ac-input {
      width: 100%;
      line-height: 1.2rem;
      border: none;
      border-bottom: 1px solid var(--ls-block-bullet-color);
      margin-bottom: 5px;
      background: var(--ls-tertiary-background-color) !important;
    }
    .kef-ac-input:focus {
      box-shadow: none;
      border-color: inherit;
      border-bottom: 1px solid var(--ls-block-bullet-color);
    }
    .kef-ac-list {
      list-style-type: none;
      margin-left: 0;
      font-size: 0.875rem;
      background: var(--ls-tertiary-background-color);
      border: 1px solid var(--ls-border-color);
      max-height: 400px;
      overflow-y: auto;
    }
    .kef-ac-list:empty {
      display: none;
    }
    .kef-ac-listitem {
      padding: 8px 16px;
      margin: 0;
      cursor: pointer;
    }
    .kef-ac-listitem:hover {
      background: var(--ls-menu-hover-color);
    }
    .kef-ac-chosen {
      background: var(--ls-selection-background-color);
    }
  `)
}

async function triggerInput() {
  textarea = parent.document.activeElement
  const editor = textarea.closest(".block-editor")
  if (editor) {
    lastBlock = await logseq.Editor.getCurrentBlock()
    editor.appendChild(inputContainer)
    inputContainer.style.display = "block"
    inputContainer.querySelector("input").focus()
  }
}

async function closeInput(text = "") {
  inputContainer.style.display = "none"
  inputContainerParent.appendChild(inputContainer)
  const pos = textarea.selectionStart
  const newPos = pos + text.length
  if (text) {
    const content = textarea.value
    await logseq.Editor.updateBlock(
      lastBlock.uuid,
      pos < content.length
        ? `${content.substring(0, pos)}${text}${content.substring(pos)}`
        : pos === content.length
        ? `${content}${text}`
        : `${content} ${text}`,
    )
  }
  textarea.focus()
  textarea.setSelectionRange(newPos, newPos)
}

logseq.ready(main).catch(console.error)
