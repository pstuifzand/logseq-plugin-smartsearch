# logseq-plugin-smartsearch

弹出一个可以帮你查找各类数据的输入框。

Triggers an input that helps you search various types of data.

## 功能展示

- 编辑时，用默认快捷键 `ctrl+space` 呼出，可在设置中更改。
- `esc` 退出输入框。
- 可按照标签搜索内容。格式为 `#tag`（或 `##tag` 如要包含它的子块）。
- 可搜索拥有某属性的内容。格式为 `@property`。
- 可按照属性值搜索内容。格式为 `@property: value`。
- 可任意组合标签与属性搜索内容，以 `,` 分割。格式为 `#Book, @published: 2022`。
- 可在最后加 `;` 进一步过滤查询结果。例如：`#book; holmes`。
- 能识别中文标点，不用刻意切换到英文。
- 支持键盘上下键选择或鼠标点击。
- 正常选择（回车或鼠标点击）插入引用，按住 `opt` 或 `alt` 选择插入文字内容。
- 按住 `shift` 选择跳转到块或页面，按住 `shift+alt` 选择在右侧边栏打开块或页面。

## Feature Highlights

- While editing, use the default shortcut key `ctrl+space` to call it out. You can change it in settings.
- `esc` to close the input.
- Search by tag. Format `#tag` (or `##tag` to also include it's children).
- Search by property existence. Format `@property`.
- Search by property value. Format `@property: value`.
- Make combinations of tags and properties, separate them with a `,`. Format `#Book, @published: 2022`.
- Put a `;` at the end to further filter the results. E.g, `#book; holmes`.
- Select using keyboard arrow keys or mouse.
- Select (Enter or click) to insert reference, hold `opt` or `alt` and select to insert text content.
- Hold `shift` and select to go to the page or block，hold `shift+alt` and select to open the page or block in the right sidebar.

## 使用展示 (Usage)

https://user-images.githubusercontent.com/3410293/201344817-97631368-3ac5-408f-a196-97d71202705f.mp4

https://user-images.githubusercontent.com/3410293/201457231-4e0575e3-b145-41c7-9748-b82b1006ac51.mp4
