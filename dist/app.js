const seasons = [
  { key: "spring", name: "春天", icon: "🌸", team: "春队", weather: "暖和", action: "看花", reasons: ["很暖和", "很漂亮", "有花"], demo: "我最喜欢春天，因为春天很暖和，也很漂亮。" },
  { key: "summer", name: "夏天", icon: "☀️", team: "夏队", weather: "很热", action: "游泳", reasons: ["很热", "可以游泳", "喜欢游泳", "有西瓜"], demo: "我最喜欢夏天，因为我喜欢游泳。" },
  { key: "autumn", name: "秋天", icon: "🍂", team: "秋队", weather: "凉快", action: "散步", reasons: ["很凉快", "很舒服", "不冷也不热", "很漂亮"], demo: "我最喜欢秋天，因为秋天不冷也不热，很舒服。" },
  { key: "winter", name: "冬天", icon: "❄️", team: "冬队", weather: "很冷", action: "滑雪", reasons: ["很冷", "下雪", "可以滑雪", "喜欢滑雪"], demo: "我最喜欢冬天，因为我喜欢滑雪。" },
];

const teams = seasons.map((season) => ({ ...season, position: 0 }));
const pathNodes = [
  { label: "九月南京", icon: "🔥", type: "start", row: 3, col: 1 },
  { label: "看图", icon: "👀", type: "picture", row: 3, col: 2 },
  { label: "幸运", icon: "🎁", type: "lucky", row: 3, col: 3 },
  { label: "动作", icon: "🎭", type: "charade", row: 3, col: 4 },
  { label: "对话", icon: "💬", type: "dialogue", row: 3, col: 5 },
  { label: "快答", icon: "⏱️", type: "timed", row: 2, col: 5 },
  { label: "句子诊断", icon: "💣", type: "diagnosis", row: 2, col: 4 },
  { label: "幸运", icon: "🎁", type: "lucky", row: 2, col: 3 },
  { label: "找问题", icon: "🤖", type: "agent", row: 2, col: 2 },
  { label: "动作", icon: "🎭", type: "charade", row: 2, col: 1 },
  { label: "变了", icon: "⚡", type: "change", row: 1, col: 1 },
  { label: "对话", icon: "💬", type: "dialogue", row: 1, col: 3 },
  { label: "十月南京", icon: "🍂", type: "finish", row: 1, col: 5 },
];

const taskMeta = {
  picture: { icon: "👀", label: "看图说中文", interaction: "看场景 · 口头说" },
  charade: { icon: "🎭", label: "动作猜词", interaction: "3轮动作 · 猜词 · 说完整句" },
  dialogue: { icon: "💬", label: "两人对话", interaction: "A问 · B答" },
  agent: { icon: "🤖", label: "找出 Agent 的问题", interaction: "全班判断 · 帮助 Agent" },
  diagnosis: { icon: "💣", label: "Agent 又说错了吗？", interaction: "判断 · 找问题 · 修改" },
  timed: { icon: "⏱️", label: "快速挑战", interaction: "10秒快答 · 没有惩罚" },
  change: { icon: "⚡", label: "“了”的变化挑战", interaction: "4轮 · 4位同学 · 口头回答" },
  memory: { icon: "🃏", label: "季节活动配对", interaction: "上排季节 · 下排活动" },
  lucky: { icon: "🎁", label: "幸运格", interaction: "快速事件" },
  quick: { icon: "📣", label: "全班快闪", interaction: "一起说一句" },
};

const taskBanks = {
  picture: [
    { play: "picture", scene: "❄️　🌨️　⛄", prompt: "看图说中文：这是什么季节？天气怎么样？", oral: true, hints: ["看看雪。", "冬天……", "冬天天气很冷，还会……"], frame: "这是 ______。天气 ______。", reference: "这是冬天。冬天天气很冷，还会下雪。" },
    { play: "picture", scene: "☀️　🌊　🏊", prompt: "看图说中文：天气怎么样？可以做什么？", oral: true, hints: ["看看太阳和水。", "夏天天气……", "夏天可以……"], frame: "夏天天气 ______，可以 ______。", reference: "夏天天气很热，可以游泳。" },
    { play: "picture", scene: "🍂　🍃　🙂", prompt: "看图说中文：秋天怎么样？", oral: true, hints: ["不冷也不热。", "天气很……", "还可以说：很舒服。"], frame: "秋天天气 ______，很 ______。", reference: "秋天天气很凉快，很舒服。" },
    { play: "picture", scene: "🌧️　☂️　💧", prompt: "看图说中文：天气怎么样？", oral: true, hints: ["看看天上和雨伞。", "有雨。", "今天……"], frame: "今天 ______。", reference: "今天下雨。" },
  ],
  charade: [
    { key: "fan-hot", word: "热 / 夏天", emoji: "🥵", actionCue: "双手扇风、擦汗", prompt: "大家猜：天气怎么样？是什么季节？", hints: ["身体觉得怎么样？", "夏天天气……", "热 / 夏天"], frame: "______ 来了，天气 ______ 了。", reference: "夏天来了，天气热了。" },
    { key: "electric-fan", word: "夏天 / 天气热", emoji: "🪭", actionCue: "模拟吹风扇", prompt: "大家猜：什么季节？天气怎么样？", hints: ["为什么要吹风？", "夏天……", "天气热。"], frame: "夏天天气很 ______。", reference: "夏天天气很热。" },
    { key: "swim", word: "游泳 / 夏天", emoji: "🏊", actionCue: "做游泳动作", prompt: "大家猜：在做什么？什么季节可以做？", hints: ["在水里。", "夏天可以……", "游泳"], frame: "夏天很热，可以 ______。", reference: "夏天很热，可以游泳。" },
    { key: "ice-cream", word: "夏天 / 天气热", emoji: "🍦", actionCue: "假装吃冰淇淋", prompt: "大家猜：什么季节？天气怎么样？", hints: ["手里拿着什么？", "天气热的时候想吃什么？", "夏天 / 热"], frame: "夏天天气很 ______。", reference: "夏天天气很热。" },
    { key: "shiver", word: "冷 / 冬天", emoji: "🥶", actionCue: "打喷嚏、抱住身体发抖", prompt: "大家猜：天气怎么样？是什么季节？", hints: ["身体觉得怎么样？", "冬天天气……", "冷 / 冬天"], frame: "______ 来了，天气 ______ 了。", reference: "冬天来了，天气冷了。" },
    { key: "sneeze", word: "冷 / 冬天", emoji: "🤧", actionCue: "连续打喷嚏，再抱住身体", prompt: "大家猜：天气怎么样？可能是什么季节？", hints: ["为什么抱住身体？", "冬天天气……", "冷 / 冬天"], frame: "冬天天气很 ______。", reference: "冬天天气很冷。" },
    { key: "scarf", word: "冬天 / 天气冷", emoji: "🧣", actionCue: "假装戴围巾和手套", prompt: "大家猜：为什么这样穿？", hints: ["什么时候戴围巾？", "冬天天气……", "天气冷。"], frame: "冬天天气很 ______。", reference: "冬天天气很冷。" },
    { key: "snowman", word: "堆雪人 / 下雪", emoji: "⛄", actionCue: "弯腰滚雪球、堆雪人", prompt: "大家猜：天气怎么了？可以做什么？", hints: ["地上有什么？", "冬天会……", "下雪 / 堆雪人"], frame: "冬天 ______ 了，可以 ______。", reference: "冬天下雪了，我们可以堆雪人。" },
    { key: "ski", word: "滑雪 / 冬天", emoji: "🎿", actionCue: "弯腰、左右移动，做滑雪动作", prompt: "大家猜：在做什么？什么季节可以做？", hints: ["在雪上。", "冬天可以……", "滑雪"], frame: "冬天会下雪，可以 ______。", reference: "冬天会下雪，可以滑雪。" },
    { key: "umbrella", word: "下雨", emoji: "☂️", actionCue: "假装撑开雨伞，在雨里走路", prompt: "大家猜：天气怎么了？", hints: ["为什么要用雨伞？", "现在有雨。", "下雨 + ？"], frame: "______ 了。", reference: "下雨了。" },
    { key: "wind", word: "刮风", emoji: "🌬️", actionCue: "身体向一边倒，衣服被风吹动", prompt: "大家猜：天气怎么了？", hints: ["是什么把身体吹动了？", "现在有风。", "刮风 + ？"], frame: "______ 了。", reference: "刮风了。" },
    { key: "flowers", word: "春天 / 花开了", emoji: "🌸", actionCue: "闻花、看花", prompt: "大家猜：什么季节来了？花怎么了？", hints: ["看看花。", "春天……", "花开了。"], frame: "______ 来了，花 ______ 了。", reference: "春天来了，花开了。" },
    { key: "coat-off", word: "天气暖和了", emoji: "🧥", actionCue: "脱掉厚外套", prompt: "大家猜：天气发生了什么变化？", hints: ["以前很冷。", "现在不用穿厚外套。", "天气暖和 + ？"], frame: "天气 ______ 了。", reference: "天气暖和了。" },
    { key: "leaves", word: "秋天 / 叶子黄了", emoji: "🍂", actionCue: "弯腰捡落叶", prompt: "大家猜：什么季节？叶子怎么了？", hints: ["看看地上的叶子。", "秋天……", "叶子黄了。"], frame: "______ 来了，叶子 ______ 了。", reference: "秋天来了，叶子黄了。" },
    { key: "coat-on", word: "秋天 / 天气凉快了", emoji: "🧥🍂", actionCue: "穿上外套", prompt: "大家猜：天气发生了什么变化？", hints: ["以前很热。", "现在要穿外套。", "天气凉快 + ？"], frame: "天气 ______ 了。", reference: "秋天来了，天气凉快了。" },
  ],
  dialogue: [
    { play: "dialogue", prompt: "请两名学生完成一个小对话。", oral: true, roles: ["A：你最喜欢什么季节？", "B：我最喜欢 ______。", "A：为什么？", "B：______ 很 ______。"], hints: ["A先问最喜欢什么季节。", "B可以选春天、夏天、秋天、冬天。", "最后说天气怎么样。"], reference: "A：你最喜欢什么季节？ B：我最喜欢秋天。 A：为什么？ B：秋天很凉快，很舒服。" },
    { play: "dialogue", prompt: "请两名学生问一问“会不会”。", oral: true, roles: ["A：你会不会游泳？", "B：我会。/ 我不会。/ 我只会一点儿。"], hints: ["A问：会不会？", "B说自己的情况。", "可以说：只会一点儿。"], reference: "A：你会不会游泳？ B：我只会一点儿。" },
  ],
  agent: [
    { play: "agent", before: "九月：天气很热", now: "十月：天气凉快", prompt: "Agent说：“现在天气很凉快。”", oral: true, challenge: true, hints: ["这句话本身可以。再看看九月和十月。", "以前很热，现在不一样。", "凉快 + ？"], frame: "天气凉快 ______。", reference: "天气凉快了。", explanation: "“现在天气很凉快”本身没有错。这里强调变化，所以可以说：天气凉快了。" },
    { play: "agent", before: "以前：夏天", now: "现在：秋天", prompt: "Agent说：“现在是秋天。”", oral: true, challenge: true, hints: ["以前是夏天。", "现在和以前不一样。", "秋天 + ？"], frame: "现在是秋天 ______。", reference: "现在是秋天了。", explanation: "句末的“了”可以告诉我们：现在的情况和以前不一样了。" },
    { play: "agent", before: "以前：天气很冷", now: "现在：天气暖和", prompt: "Agent说：“现在天气很暖和。”", oral: true, challenge: true, hints: ["这句话本身可以。", "现在和以前不一样。", "暖和 + ？"], frame: "天气暖和 ______。", reference: "天气暖和了。", explanation: "普通描述可以说“天气很暖和”；强调变化可以说“天气暖和了”。" },
    { play: "agent", before: "以前：没有花", now: "现在：有花", prompt: "Agent说：“现在有花。”", oral: true, challenge: true, hints: ["这句话本身可以。", "花发生了什么变化？", "花开 + ？"], frame: "花开 ______。", reference: "花开了。", explanation: "这里强调花发生了变化，可以说：花开了。" },
    { play: "agent", before: "以前：天气不冷", now: "现在：天气冷", prompt: "Agent说：“现在天气很冷。”", oral: true, challenge: true, hints: ["这句话本身可以。", "现在和以前不一样。", "冷 + ？"], frame: "天气冷 ______。", reference: "天气冷了。", explanation: "普通描述可以说“天气很冷”；强调变化可以说“天气冷了”。" },
    { play: "agent", before: "以前：没有雪", now: "现在：有雪", prompt: "Agent说：“现在下雪。”", oral: true, challenge: true, hints: ["现在出现了新的情况。", "雪开始下了。", "下雪 + ？"], frame: "下雪 ______。", reference: "下雪了。", explanation: "“了”告诉我们：现在出现了下雪的新情况。" },
    { play: "agent", before: "刚才：没有风", now: "现在：有风", prompt: "Agent说：“现在刮风。”", oral: true, challenge: true, hints: ["刚才和现在一样吗？", "现在出现了风。", "刮风 + ？"], frame: "刮风 ______。", reference: "刮风了。", explanation: "“了”告诉我们：现在出现了刮风的新情况。" },
  ],
  timed: [
    { play: "timed", seconds: 10, before: "☀️ 夏天：很热", now: "🍂 秋天：凉快", prompt: "10秒快答：现在和以前有什么不一样？", oral: true, hints: ["先说季节。", "再说天气。", "两个句子最后都可以用“了”。"], frame: "现在是 ______ 了。天气 ______ 了。", reference: "现在是秋天了，天气凉快了。", explanation: "句末的“了”可以告诉我们：现在的情况和以前不一样了。" },
    { play: "timed", seconds: 10, scene: "🌨️　❄️　🎿", prompt: "10秒快答：冬天天气怎么样？可以做什么？", oral: true, hints: ["天气……", "冬天下雪。", "可以……"], frame: "冬天很 ______，可以 ______。", reference: "冬天很冷，会下雪，可以滑雪。" },
    { play: "timed", seconds: 10, before: "🌱 以前：没有花", now: "🌸 现在：有花", prompt: "10秒快答：春天发生了什么变化？", oral: true, hints: ["春天来了。", "看看花。", "花开 + ？"], frame: "春天 ______。花 ______。", reference: "春天来了，花开了。", explanation: "“了”表示现在出现了新的情况。" },
    { play: "timed", seconds: 10, before: "🌳 昨天：叶子是绿色的", now: "🍂 今天：叶子是黄色的", prompt: "10秒快答：叶子怎么了？", oral: true, hints: ["昨天和今天不一样。", "今天叶子是黄色的。", "叶子黄 + ？"], frame: "叶子 ______ 了。", reference: "叶子黄了。", explanation: "“了”表示叶子的情况发生了变化。" },
    { play: "timed", seconds: 10, before: "☁️ 刚才：没有雨", now: "🌧️ 现在：有雨", prompt: "10秒快答：天气怎么了？", oral: true, hints: ["现在出现了新的情况。", "看看雨伞。", "下雨 + ？"], frame: "______ 了。", reference: "下雨了。", explanation: "“了”表示现在开始下雨了。" },
  ],
  change: [
    { play: "change", before: "九月：天气很热", beforeIcon: "☀️", now: "十月：天气凉快", nowIcon: "🍂", prompt: "天气怎么了？请说变化。", oral: true, hints: ["九月和十月一样吗？", "以前很热，现在变凉快。", "天气 + 凉快 + ？"], frame: "天气 ______ 了。", reference: "天气凉快了。", explanation: "句末的“了”可以告诉我们：现在的情况和以前不一样了。" },
    { play: "change", before: "以前：树不是绿色的", beforeIcon: "🌳", now: "现在：树是绿色的", nowIcon: "🌳", prompt: "树怎么了？请说变化。", oral: true, hints: ["以前和现在一样吗？", "现在树是绿色的。", "树 + 绿 + ？"], frame: "树都 ______ 了。", reference: "树都绿了。", explanation: "句末的“了”可以告诉我们：现在的情况和以前不一样了。" },
    { play: "change", before: "以前：不会滑雪", beforeIcon: "🙅", now: "现在：会一点儿", nowIcon: "🎿", prompt: "现在会不会滑雪？请说变化。", oral: true, hints: ["以前不会。", "现在会一点儿。", "会一点儿 + ？"], frame: "现在会一点儿 ______。", reference: "现在会一点儿了。", explanation: "句末的“了”可以告诉我们：现在的情况和以前不一样了。" },
    { play: "change", before: "以前：天气很冷", beforeIcon: "🥶", now: "现在：天气暖和", nowIcon: "🌸", prompt: "看前后状态，说天气的变化。", oral: true, hints: ["以前很冷。", "现在不冷了。", "天气暖和 + ？"], frame: "天气 ______ 了。", reference: "天气暖和了。", explanation: "“了”表示天气发生了变化。" },
    { play: "change", before: "昨天：28℃", beforeIcon: "🌡️", now: "今天：20℃", nowIcon: "🍃", prompt: "天气怎么样了？", oral: true, hints: ["今天比昨天低八度。", "昨天热，今天……", "天气凉快 + ？"], frame: "天气 ______ 了。", reference: "天气凉快了。", explanation: "这里比较昨天和今天，所以用“了”说变化。" },
    { play: "change", before: "昨天：叶子是绿色的", beforeIcon: "🌳", now: "今天：叶子是黄色的", nowIcon: "🍂", prompt: "根据描述说变化。", oral: true, hints: ["昨天和今天不一样。", "今天叶子是黄色的。", "叶子黄 + ？"], frame: "叶子 ______ 了。", reference: "叶子黄了。", explanation: "“了”表示叶子的情况发生了变化。" },
    { play: "change", before: "刚才：没有雨", beforeIcon: "☁️", now: "现在：有雨", nowIcon: "🌧️", prompt: "现在天气怎么了？", oral: true, hints: ["刚才没有雨。", "现在出现了新的情况。", "下雨 + ？"], frame: "______ 了。", reference: "下雨了。", explanation: "“了”表示现在出现了下雨的新情况。" },
    { play: "change", before: "刚才：没有风", beforeIcon: "🌤️", now: "现在：有风", nowIcon: "🌬️", prompt: "现在天气怎么了？", oral: true, hints: ["刚才没有风。", "现在出现了新的情况。", "刮风 + ？"], frame: "______ 了。", reference: "刮风了。", explanation: "“了”表示现在出现了刮风的新情况。" },
    { play: "change", before: "南京九月：很热", beforeIcon: "☀️", now: "南京十月：凉快", nowIcon: "🍂", prompt: "补全句子：南京十月天气凉快____。", oral: false, options: ["了", "很", "不"], correct: "了", hints: ["九月和十月一样吗？", "这里要说出变化。", "凉快 + ？"], reference: "南京十月天气凉快了。", explanation: "句末的“了”表示南京的天气发生了变化。", wrongFeedback: "句子要说出从热到凉快的变化。" },
    { play: "change", before: "以前：天气很冷", beforeIcon: "❄️", now: "现在：天气暖和", nowIcon: "🌤️", prompt: "选择最能说出变化的句子。", oral: false, options: ["天气暖和了。", "天气很暖和。", "天气暖和。"], correct: "天气暖和了。", hints: ["三个句子都能描述现在。", "题目要强调以前和现在不一样。", "哪一句有“了”？"], reference: "天气暖和了。", explanation: "“天气很暖和”可以描述现在；“天气暖和了”更明确地说出变化。", wrongFeedback: "这个句子可以描述现在，但还没有突出变化。" },
    { play: "change", before: "以前：不是春天", beforeIcon: "❄️", now: "现在：春天", nowIcon: "🌸", prompt: "现在是什么季节了？", oral: true, hints: ["以前不是春天。", "现在和以前不一样。", "春天来 + ？"], frame: "春天 ______。", reference: "春天来了。", explanation: "“了”表示春天这个新情况出现了。" },
    { play: "change", before: "以前：不是夏天", beforeIcon: "🌸", now: "现在：夏天", nowIcon: "☀️", prompt: "现在是什么季节了？", oral: true, hints: ["以前不是夏天。", "现在天气热。", "夏天来 + ？"], frame: "夏天 ______。", reference: "夏天来了。", explanation: "“了”表示夏天来了。" },
    { play: "change", before: "以前：不是冬天", beforeIcon: "🍂", now: "现在：冬天", nowIcon: "❄️", prompt: "现在是什么季节了？", oral: true, hints: ["以前不是冬天。", "现在天气冷。", "冬天来 + ？"], frame: "冬天 ______。", reference: "冬天来了。", explanation: "“了”表示冬天来了。" },
  ],
  diagnosis: [
    { play: "diagnosis", category: "表达选择", before: "九月：天气很热", now: "十月：天气凉快", sentence: "现在天气很凉快。", prompt: "这句话有语法错误吗？", verdict: "valid", hints: ["先判断句子本身，再看变化情境。", "没有“了”也可以是正确句子。", "强调以前和现在不一样，可以加“了”。"], success: "句子本身可以！变化情境下，还能说得更好。", reference: "天气凉快了。", explanation: "“现在天气很凉快”本身没有错。这里强调变化，所以可以说：天气凉快了。" },
    { play: "diagnosis", category: "普通描述", scene: "🍂　🙂", sentence: "今天天气很凉快。", prompt: "这句话可以吗？", verdict: "valid", hints: ["这里是在说今天的天气。", "没有“以前→现在”的对比。", "普通描述不一定要用句末“了”。"], success: "可以！这是自然的天气描述。", reference: "今天天气很凉快。", explanation: "这里没有强调变化，不用“了”也完全正确。" },
    { play: "diagnosis", category: "变化没有说完整", before: "南京九月：天气很热", now: "南京十月：天气凉快", sentence: "南京十月天气凉快。", prompt: "这句话说出变化了吗？", verdict: "issue", hints: ["意思能懂，但要说出九月和十月不一样。", "这里强调从热到凉快。", "凉快 + ？"], success: "发现了！意思对，但变化还没有说完整。", reference: "南京十月天气凉快了。", explanation: "这里强调变化，所以句末用“了”。" },
    { play: "diagnosis", category: "变化没有说完整", before: "以前：天气不冷", now: "现在：冬天来了", sentence: "冬天来了，天气冷。", prompt: "还能怎样说得更完整？", verdict: "issue", hints: ["前一句已经说“冬天来了”。", "天气也发生了变化。", "冷 + ？"], success: "发现了！第二句也要说出变化。", reference: "冬天来了，天气冷了。", explanation: "“天气冷”可以描述天气；这里强调变化，所以说“天气冷了”。" },
    { play: "diagnosis", category: "漏用“了”", before: "以前：不是春天", now: "现在：春天", sentence: "春天来。", prompt: "Agent说完整了吗？", verdict: "issue", hints: ["现在出现了新的季节。", "春天和以前不一样。", "来 + ？"], success: "抓到啦！春天这个新情况出现了。", reference: "春天来了。", explanation: "句末的“了”表示春天来了。" },
    { play: "diagnosis", category: "变化没有说完整", before: "昨天：天气很热", now: "今天：天气凉快", sentence: "昨天很热，今天凉快。", prompt: "这句话说出变化了吗？", verdict: "issue", hints: ["昨天和今天不一样。", "这里强调从热到凉快。", "凉快 + ？"], success: "发现了！意思对，再把变化说出来。", reference: "昨天很热，今天凉快了。", explanation: "这里强调今天和昨天不一样，所以用“了”。" },
    { play: "diagnosis", category: "“了”的误用", scene: "🍂　❤️　每天都喜欢", sentence: "我喜欢了秋天。", prompt: "这里只是在说平常的喜好，可以吗？", verdict: "issue", hints: ["这里没有说喜好发生变化。", "平常的喜好怎么说？", "去掉“了”。"], success: "抓到啦！这里没有强调变化。", reference: "我喜欢秋天。", explanation: "这里只说平常的喜好，不需要“了”。" },
    { play: "diagnosis", category: "“了”的位置", scene: "📅　🏊", sentence: "我每天了游泳。", prompt: "这个句子可以吗？", verdict: "issue", hints: ["“每天”表示常常做。", "这里不需要“了”。", "我每天 + 游泳。"], success: "抓到啦！“了”放在这里不对。", reference: "我每天游泳。", explanation: "这里说每天做的活动，不使用“每天了游泳”。" },
    { play: "diagnosis", category: "“了”的位置", scene: "☀️　🥵", sentence: "夏天很了热。", prompt: "这个句子可以吗？", verdict: "issue", hints: ["看看“很”和“热”中间。", "“很热”不能从中间分开。", "去掉“了”。"], success: "抓到啦！“了”不能放在“很”和“热”中间。", reference: "夏天很热。", explanation: "普通描述说“夏天很热”。" },
    { play: "diagnosis", category: "句子结构", scene: "❄️　❤️", sentence: "我最喜欢冬天了冷。", prompt: "这个句子可以吗？", verdict: "issue", hints: ["先说喜欢什么季节。", "再用“因为”说理由。", "冬天很冷。"], success: "抓到啦！这里需要两个清楚的部分。", reference: "我最喜欢冬天，因为冬天很冷。", explanation: "这里用“因为”说明喜欢冬天的理由，不使用“冬天了冷”。" },
    { play: "diagnosis", category: "正确使用“了”", before: "刚才：没有雨", now: "现在：有雨", sentence: "下雨了。", prompt: "这个句子可以吗？", verdict: "valid", hints: ["刚才和现在一样吗？", "现在出现了新的情况。", "这里的“了”用得对。"], success: "可以！“了”说出了新的情况。", reference: "下雨了。", explanation: "刚才没有雨，现在下雨了。" },
    { play: "diagnosis", category: "词序问题", scene: "🍂　❤️", sentence: "我最喜欢是秋天。", prompt: "这个句子可以吗？", verdict: "issue", hints: ["看看“最喜欢”的后面。", "“最喜欢”后面直接说季节。", "去掉一个字。"], success: "抓到啦！这里是词序问题。", reference: "我最喜欢秋天。", explanation: "“最喜欢”的后面直接说喜欢的人或事物。" },
    { play: "diagnosis", category: "否定形式", scene: "🎿　🙅", sentence: "我没有会滑雪。", prompt: "这个句子可以吗？", verdict: "issue", hints: ["想一想：“会”的否定怎么说？", "会不会？", "不 + 会"], success: "抓到啦！这里是否定形式的问题。", reference: "我不会滑雪。", explanation: "“会”的否定说“不会”。" },
    { play: "diagnosis", category: "程度副词", scene: "☀️　🔥", sentence: "夏天天气很太热。", prompt: "这个句子可以吗？", verdict: "issue", hints: ["看看“很”和“太”。", "这里不要把两个程度词放在一起。", "可以说“很热”，也可以说“太热了”。"], success: "抓到啦！这里的程度词放多了。", reference: "夏天天气很热。", explanation: "这里用“很热”就可以；也可以说“天气太热了”。" },
    { play: "diagnosis", category: "“最”的使用", scene: "🌸 ☀️ 🍂 ❄️", sentence: "我很最喜欢秋天。", prompt: "这个句子可以吗？", verdict: "issue", hints: ["看看“很”和“最”。", "“最喜欢”已经表示第一。", "去掉“很”。"], success: "抓到啦！“最喜欢”前面不加“很”。", reference: "我最喜欢秋天。", explanation: "这里直接说“最喜欢”。" },
    { play: "diagnosis", category: "会 + 活动", scene: "🏊　🙂", sentence: "我会很游泳。", prompt: "这个句子可以吗？", verdict: "issue", hints: ["“会”后面放什么？", "“游泳”是活动。", "会 + 游泳"], success: "抓到啦！这里是搭配问题。", reference: "我会游泳。", explanation: "“会”后面直接说活动：会游泳、会滑雪。" },
    { play: "diagnosis", category: "语境判断", scene: "❄️　🌨️　⛄", sentence: "冬天很热，可以游泳。", prompt: "这句话和画面合适吗？", verdict: "issue", hints: ["句子的词序没有问题。", "再看看雪和冬天。", "这是语境不自然，不是语法错误。"], success: "抓到啦！句子语法可以，但是和画面不太合适。", reference: "冬天很冷，会下雪，可以滑雪。", explanation: "这是语境不自然，不是语法错误。" },
  ],
};

// 独立课堂工具题库：后续可按正式课文直接替换或追加条目。
const quickQuestionBank = [
  { key: "season-count", category: "season", label: "季节", icon: "🌸", prompt: "一年有几个季节？", hints: ["春、夏、秋、冬。", "请用一个完整句回答。"], reference: "一年有四个季节。" },
  { key: "season-names", category: "season", label: "季节", icon: "🌦️", prompt: "四个季节是什么？", hints: ["先说春天。", "春天、夏天……"], reference: "四个季节是春天、夏天、秋天和冬天。" },
  { key: "season-nanjing-oct", category: "season", label: "季节", icon: "🍂", prompt: "南京十月是什么季节？", hints: ["九月以后天气凉快了。", "现在是____了。"], reference: "南京十月是秋天。现在是秋天了。" },
  { key: "season-after-winter", category: "season", label: "季节", icon: "❄️🌸", prompt: "冬天以后是什么季节？", hints: ["天气会暖和。", "冬天以后是____。"], reference: "冬天以后是春天。" },
  { key: "season-favorite", category: "season", label: "季节", icon: "💬", prompt: "你最喜欢什么季节？", hints: ["我最喜欢……", "还可以说一说为什么。"], reference: "我最喜欢秋天，因为秋天很凉快。" },
  { key: "weather-summer", category: "weather", label: "天气", icon: "☀️", prompt: "夏天天气怎么样？", hints: ["看看太阳。", "夏天天气很____。"], reference: "夏天天气很热。" },
  { key: "weather-winter", category: "weather", label: "天气", icon: "❄️", prompt: "冬天天气怎么样？", hints: ["冬天要多穿衣服。", "冬天天气很____。"], reference: "冬天天气很冷。" },
  { key: "weather-autumn", category: "weather", label: "天气", icon: "🍂", prompt: "秋天天气怎么样？", hints: ["不冷也不热。", "秋天天气很____。"], reference: "秋天天气很凉快，很舒服。" },
  { key: "weather-nanjing", category: "weather", label: "天气", icon: "🏫🍂", prompt: "南京十月天气怎么样？", hints: ["九月很热，现在不一样。", "天气凉快____。"], reference: "南京十月天气凉快了。" },
  { key: "weather-hot-season", category: "weather", label: "天气", icon: "🥵", prompt: "什么季节天气很热？", hints: ["可以游泳。", "____天气很热。"], reference: "夏天天气很热。" },
  { key: "weather-cold-season", category: "weather", label: "天气", icon: "🥶", prompt: "什么季节天气很冷？", hints: ["可能下雪。", "____天气很冷。"], reference: "冬天天气很冷。" },
  { key: "activity-summer", category: "activity", label: "活动", icon: "🏊", prompt: "夏天可以做什么？", hints: ["看看水。", "夏天可以____。"], reference: "夏天可以游泳。" },
  { key: "activity-winter", category: "activity", label: "活动", icon: "🎿", prompt: "冬天可以做什么？", hints: ["雪上有什么活动？", "冬天可以____。"], reference: "冬天可以滑雪。" },
  { key: "activity-swim-season", category: "activity", label: "活动", icon: "🌊", prompt: "什么季节可以游泳？", hints: ["天气很热。", "____可以游泳。"], reference: "夏天可以游泳。" },
  { key: "activity-snowman", category: "activity", label: "活动", icon: "⛄", prompt: "什么季节可以堆雪人？", hints: ["先要下雪。", "____可以堆雪人。"], reference: "冬天下雪了，可以堆雪人。" },
  { key: "activity-autumn", category: "activity", label: "活动", icon: "🍂", prompt: "秋天可以做什么？", hints: ["天气很舒服。", "可以在学校走一走。"], reference: "秋天天气很舒服，可以散步。" },
];

const finalChangeBank = [
  { key: "nanjing-cool", before: "九月南京：32℃", beforeIcon: "☀️", now: "十月南京：22℃", nowIcon: "🍂", prompt: "现在南京的天气怎么样了？", hints: ["九月和十月一样吗？", "以前很热，现在凉快。", "天气凉快 + ？"], reference: "南京十月天气凉快了。" },
  { key: "leaves-yellow", before: "以前：绿色叶子", beforeIcon: "🌳", now: "现在：黄色叶子", nowIcon: "🍂", prompt: "叶子发生了什么变化？", hints: ["以前和现在的颜色不一样。", "现在叶子是黄色的。", "叶子黄 + ？"], reference: "叶子黄了。" },
  { key: "rain-starts", before: "刚才：晴天", beforeIcon: "🌤️", now: "现在：有雨", nowIcon: "🌧️", prompt: "现在天气怎么了？", hints: ["现在出现了新的情况。", "看看雨伞。", "下雨 + ？"], reference: "下雨了。" },
  { key: "weather-cold", before: "以前：天气暖和", beforeIcon: "🌤️", now: "现在：天气冷", nowIcon: "❄️", prompt: "天气发生了什么变化？", hints: ["以前暖和，现在不一样。", "现在天气冷。", "天气冷 + ？"], reference: "天气冷了。" },
];

const finalErrorBank = [
  { key: "missing-cool", sentence: "南京十月天气凉快。", context: "九月很热 → 十月凉快", hints: ["意思对了，不过这里强调变化。", "九月和十月不一样。", "凉快 + ？"], reference: "南京十月天气凉快了。" },
  { key: "misuse-like", sentence: "我喜欢了秋天。", context: "说自己的喜好", hints: ["这里是在说喜好，不是在说新的变化。", "“喜欢”后面直接说季节。", "去掉哪一个词？"], reference: "我喜欢秋天。" },
  { key: "wrong-position-hot", sentence: "夏天很了热。", context: "说夏天的天气", hints: ["看看“了”的位置。", "这里只是普通描述。", "夏天很____。"], reference: "夏天很热。" },
  { key: "missing-spring", sentence: "春天来。", context: "冬天过去，现在是春天", hints: ["现在出现了新的季节。", "春天和以前不一样。", "春天来 + ？"], reference: "春天来了。" },
];

// 班级学号独立维护。修改班级名单时只需要调整这个数组。
const STUDENT_IDS = ["02", "03", "06", "07", "08", "09", "10", "11", "12", "13", "14", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26"];
const CORE_COVERAGE_TYPES = {
  weather: ["picture"],
  activity: ["charade"],
  expression: ["dialogue"],
  change: ["change"],
  correction: ["agent", "diagnosis"],
  memory: ["memory"],
};
const CORE_TASK_TYPES = ["picture", "charade", "dialogue", "memory", "agent", "diagnosis", "timed", "change"];

// 配对任务固定为“季节 → 本题图片中的活动”。放风筝、看红叶是配图可直接理解的少量扩展词。
const memoryPairs = [
  { key: "spring", season: "春天", seasonIcon: "🌸", activity: "放风筝", activityIcon: "🪁", sentence: "春天可以放风筝。" },
  { key: "summer", season: "夏天", seasonIcon: "☀️", activity: "游泳", activityIcon: "🏊", sentence: "夏天可以游泳。" },
  { key: "autumn", season: "秋天", seasonIcon: "🍂", activity: "看红叶", activityIcon: "🍁", sentence: "秋天可以看红叶。" },
  { key: "winter", season: "冬天", seasonIcon: "❄️", activity: "滑雪", activityIcon: "🎿", sentence: "冬天可以滑雪。" },
];

// “了”的四轮挑战题库。每轮从不同类别抽一题，后续可以按正式课文替换条目。
const changeChallengeBank = {
  weather: [
    { key: "weather-cold", category: "天气变化", before: "原来：天气暖和", beforeIcon: "🌤️", now: "现在：天气很冷", nowIcon: "🥶", prompt: "天气怎么了？", keywords: "天气、冷、了", reference: "天气冷了。", acceptable: ["现在天气冷了。"] },
    { key: "weather-hot", category: "天气变化", before: "早上：天气凉快", beforeIcon: "🍃", now: "中午：天气很热", nowIcon: "☀️", prompt: "天气怎么了？", keywords: "天气、热、了", reference: "天气热了。", acceptable: ["现在天气热了。"] },
    { key: "nanjing-cool", category: "天气变化", before: "九月南京：很热", beforeIcon: "🥵", now: "十月南京：凉快", nowIcon: "🍂", prompt: "南京的天气怎么了？", keywords: "天气、凉快、了", reference: "天气凉快了。", acceptable: ["南京十月天气凉快了。", "天气不热了。"] },
  ],
  season: [
    { key: "spring-arrives", category: "季节变化", before: "原来：冬天", beforeIcon: "❄️", now: "现在：春天", nowIcon: "🌸", prompt: "什么季节来了？", keywords: "春天、来、了", reference: "春天来了。", acceptable: ["现在是春天了。"] },
    { key: "autumn-arrives", category: "季节变化", before: "原来：夏天", beforeIcon: "☀️", now: "现在：秋天", nowIcon: "🍂", prompt: "什么季节来了？", keywords: "秋天、来、了", reference: "秋天来了。", acceptable: ["现在是秋天了。", "南京的秋天来了。"] },
    { key: "winter-arrives", category: "季节变化", before: "原来：秋天", beforeIcon: "🍂", now: "现在：冬天", nowIcon: "❄️", prompt: "现在是什么季节了？", keywords: "冬天、到、了", reference: "冬天到了。", acceptable: ["冬天来了。", "现在是冬天了。"] },
  ],
  nature: [
    { key: "leaves-yellow", category: "自然变化", before: "原来：绿色树叶", beforeIcon: "🌳", now: "现在：黄色树叶", nowIcon: "🍂", prompt: "树叶怎么了？", keywords: "树叶、黄、了", reference: "树叶黄了。", acceptable: ["叶子黄了。"] },
    { key: "flowers-open", category: "自然变化", before: "原来：没有花", beforeIcon: "🌱", now: "现在：有花", nowIcon: "🌸", prompt: "花怎么了？", keywords: "花、开、了", reference: "花开了。", acceptable: ["春天来了，花开了。"] },
    { key: "grass-green", category: "自然变化", before: "原来：草不是绿色的", beforeIcon: "🌾", now: "现在：草是绿色的", nowIcon: "🌱", prompt: "草怎么了？", keywords: "草、绿、了", reference: "草绿了。", acceptable: ["春天来了，草绿了。"] },
  ],
  feeling: [
    { key: "feel-cold", category: "人的感受", before: "原来：不冷", beforeIcon: "🙂", now: "现在：觉得冷", nowIcon: "🥶", prompt: "你现在觉得怎么样？", keywords: "我、冷、了", reference: "我冷了。", acceptable: ["我觉得冷了。"] },
    { key: "feel-hot", category: "人的感受", before: "原来：不热", beforeIcon: "🙂", now: "现在：觉得热", nowIcon: "🥵", prompt: "你现在觉得怎么样？", keywords: "我、热、了", reference: "我热了。", acceptable: ["我觉得热了。"] },
    { key: "feel-tired", category: "人的感受", before: "原来：不累", beforeIcon: "🙂", now: "走了很久：很累", nowIcon: "😮‍💨", prompt: "你现在怎么样？", keywords: "我、累、了", reference: "我累了。", acceptable: ["现在我累了。"] },
  ],
  clothing: [
    { key: "coat-on", category: "穿着变化", before: "原来：不穿外套", beforeIcon: "👕", now: "天气冷：开始穿外套", nowIcon: "🧥", prompt: "天气冷了，你开始做什么？", keywords: "开始、穿外套、了", reference: "我开始穿外套了。", acceptable: ["天气冷了，我穿外套了。"] },
    { key: "hat-on", category: "穿着变化", before: "原来：不戴帽子", beforeIcon: "🙂", now: "天气冷：开始戴帽子", nowIcon: "🧢", prompt: "天气冷了，你开始做什么？", keywords: "开始、戴帽子、了", reference: "我开始戴帽子了。", acceptable: ["天气冷了，我戴帽子了。"] },
  ],
  time: [
    { key: "october-arrives", category: "时间变化", before: "原来：九月", beforeIcon: "9️⃣", now: "现在：十月", nowIcon: "🔟", prompt: "现在是几月了？", keywords: "十月、到、了", reference: "十月到了。", acceptable: ["现在是十月了。"] },
    { key: "dark-now", category: "时间变化", before: "刚才：天还亮", beforeIcon: "🌇", now: "现在：天黑", nowIcon: "🌙", prompt: "天怎么了？", keywords: "天、黑、了", reference: "天黑了。", acceptable: ["现在天黑了。"] },
  ],
  negative: [
    { key: "not-hot", category: "否定变化", before: "原来：天气很热", beforeIcon: "🥵", now: "现在：天气凉快", nowIcon: "🍃", prompt: "现在天气还热吗？", keywords: "天气、不热、了", reference: "天气不热了。", acceptable: ["天气凉快了。"] },
    { key: "not-cold", category: "否定变化", before: "原来：我很冷", beforeIcon: "🥶", now: "现在：很暖和", nowIcon: "🙂", prompt: "你现在还冷吗？", keywords: "我、不冷、了", reference: "我不冷了。", acceptable: ["现在我不冷了。"] },
    { key: "rain-stops", category: "否定变化", before: "刚才：下雨", beforeIcon: "🌧️", now: "现在：没有雨", nowIcon: "🌤️", prompt: "现在还下雨吗？", keywords: "现在、不下雨、了", reference: "现在不下雨了。", acceptable: ["不下雨了。"] },
  ],
};

const finalChallengeCategories = [
  { key: "season", icon: "🌸", label: "季节" },
  { key: "weather", icon: "🌦️", label: "天气" },
  { key: "activity", icon: "🏃", label: "活动" },
  { key: "change", icon: "⚡", label: "“了”" },
  { key: "error", icon: "🔍", label: "找错误" },
];

// 每类三级各保留一个基础示例，方便之后用正式教学语料替换。
const finalChallengeBank = {
  season: [
    { prompt: "请说出这个季节：🍂", visual: "🍂", hints: ["天气很凉快。", "春、夏、秋、冬里的第三个。"], reference: "这是秋天。" },
    { prompt: "请按顺序说出四个季节。", visual: "🌸 → ☀️ → 🍂 → ❄️", hints: ["从春天开始。", "春天、夏天……"], reference: "春天、夏天、秋天、冬天。" },
    { prompt: "冬天以后是什么季节？请说完整句。", visual: "❄️ → ？", hints: ["天气会暖和。", "冬天以后是____。"], reference: "冬天以后是春天。" },
  ],
  weather: [
    { prompt: "夏天天气怎么样？", visual: "☀️🥵", hints: ["看看太阳。", "夏天天气很____。"], reference: "夏天天气很热。" },
    { prompt: "秋天天气怎么样？请说两个词。", visual: "🍂🙂", hints: ["不冷也不热。", "凉快、舒服。"], reference: "秋天天气很凉快，很舒服。" },
    { prompt: "请比较夏天和秋天的天气。", visual: "☀️ ↔ 🍂", hints: ["夏天很热。", "秋天不太热，很凉快。"], reference: "夏天很热，秋天天气很凉快。" },
  ],
  activity: [
    { prompt: "夏天可以做什么？", visual: "☀️🏊", hints: ["在水里。", "夏天可以____。"], reference: "夏天可以游泳。" },
    { prompt: "冬天下雪了，可以做什么？", visual: "❄️⛄", hints: ["可以用雪。", "可以堆____。"], reference: "冬天下雪了，可以堆雪人。" },
    { prompt: "请说一个季节、天气和活动。", visual: "🌸 ☀️ 🍂 ❄️", hints: ["先选一个季节。", "____天气很____，可以____。"], reference: "夏天天气很热，可以游泳。" },
  ],
  change: [
    { prompt: "以前很热，现在凉快。天气怎么了？", visual: "🥵 → 🍃", hints: ["现在和以前不一样。", "天气凉快 + ？"], reference: "天气凉快了。" },
    { prompt: "以前暖和，现在很冷。天气怎么了？", visual: "🌤️ → ❄️", hints: ["天气发生了变化。", "天气冷 + ？"], reference: "天气冷了。" },
    { prompt: "刚才没有雪，现在有雪。发生什么了？", visual: "☁️ → 🌨️", hints: ["出现了新的情况。", "下雪 + ？"], reference: "下雪了。" },
  ],
  error: [
    { prompt: "请修改：春天来。", visual: "🤖 春天来。", hints: ["现在出现了新的季节。", "春天来 + ？"], reference: "春天来了。" },
    { prompt: "请修改：我喜欢了秋天。", visual: "🤖 我喜欢了秋天。", hints: ["这里是在说喜好。", "这里不需要“了”。"], reference: "我喜欢秋天。" },
    { prompt: "请修改：夏天很了热。", visual: "🤖 夏天很了热。", hints: ["看看“了”的位置。", "这里只是普通描述。"], reference: "夏天很热。" },
  ],
};

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const TTS_STORAGE_KEY = "chinese-teaching-agent.tts.v1";
const TTS_PREVIEW_TEXT = "大家好，我是今天的 Agent 助教。南京的秋天来了，我们一起看看天气发生了什么变化吧！";
const CORE_TARGET = 10;
const VOTE_SCALE = 25;
const taskSelectionMemory = {};
let recentCharadeKeys = [];
const storedTtsSettings = loadStoredTtsSettings();
const ttsSettings = { voices: [], chineseVoices: [], voiceURI: storedTtsSettings.voiceURI || "", rate: normalizeRate(storedTtsSettings.rate), pitch: 1, volume: 1 };

function initialState() {
  return {
    mode: "home",
    teams: teams.map((team) => ({ ...team, position: 0, freeHints: 0 })),
    currentTeam: 0,
    round: 1,
    phase: "ready",
    die: null,
    coreCompleted: 0,
    quickEvents: 0,
    task: null,
    taskCounters: { picture: 0, charade: 0, dialogue: 0, agent: 0, diagnosis: 0, timed: 0, change: 0, memory: 0 },
    seenTypes: { picture: 0, charade: 0, dialogue: 0, agent: 0, diagnosis: 0, timed: 0, change: 0, memory: 0 },
    coreCoverage: { weather: false, activity: false, expression: false, change: false, correction: false, memory: false },
    recentCoreTypes: [],
    challengerOfferCategories: [],
    keepTurn: false,
    quickTool: { category: "all", question: null, recentKeys: [], hint: 0, answered: false, count: 0 },
    vote: { active: false, revealed: false, votes: { spring: 0, summer: 0, autumn: 0, winter: 0 }, history: [], reason: "" },
    challenger: { remaining: [...STUDENT_IDS], drawn: [], recent: [], current: null, rolling: false },
    finalUnlocked: false,
    final: { active: false, phase: "board", teamIndex: 0, selectedCategory: "", difficulty: 0, challenge: null, hint: 0, feedback: "", completed: false },
    voice: { context: "", status: "", transcript: "" },
  };
}

let state = initialState();
let recognition = null;
let speechRunId = 0;
let voiceSettingsDialog = null;
let challengeTimer = null;
let challengerRunId = 0;

const stage = document.querySelector("#game-stage");
const agentPanel = document.querySelector("#agent-panel");
const agentMessage = document.querySelector("#agent-message");
const agentStatus = document.querySelector("#agent-status");
const agentStateIcon = document.querySelector("#agent-state-icon");
const agentSpeaker = document.querySelector("#agent-speaker");
const currentTeamLabel = document.querySelector("#current-team-label");
const turnLabel = document.querySelector("#turn-label");
const missionCount = document.querySelector("#mission-count");
const missionProgress = document.querySelector("#mission-progress");
const progressFill = document.querySelector("#progress-fill");
const progressNote = document.querySelector("#progress-note");
const finalButton = document.querySelector("#final-challenge-button");
const restartButton = document.querySelector("#restart-game");
const backToConsoleButton = document.querySelector("#back-to-console");
const gameHud = document.querySelector(".game-hud");
const legendPanel = document.querySelector("#legend-panel");
const liveRegion = document.querySelector("#live-region");

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}
function normalizeRate(value) { const rate = Number(value); return Number.isFinite(rate) ? Math.min(1.1, Math.max(0.75, rate)) : 0.9; }
function currentTeam() { return state.teams[state.currentTeam]; }
function announce(message) { liveRegion.textContent = ""; window.setTimeout(() => { liveRegion.textContent = message; }, 30); }
function wait(ms) { return new Promise((resolve) => window.setTimeout(resolve, ms)); }

function loadStoredTtsSettings() {
  try { return JSON.parse(window.localStorage.getItem(TTS_STORAGE_KEY) || "{}") || {}; } catch { return {}; }
}
function saveTtsSettings() {
  try { window.localStorage.setItem(TTS_STORAGE_KEY, JSON.stringify({ voiceURI: ttsSettings.voiceURI, rate: ttsSettings.rate })); } catch { /* Storage is optional. */ }
}
function chineseVoiceScore(voice) {
  const lang = (voice.lang || "").toLowerCase(); const name = (voice.name || "").toLowerCase(); let score = 0;
  if (lang === "zh-cn") score += 120; else if (lang.startsWith("zh-hans")) score += 115; else if (lang === "zh-sg") score += 108; else if (lang.startsWith("zh")) score += 90;
  if (/mandarin|普通话|普通話|国语|國語/.test(name)) score += 35;
  if (/premium|enhanced|natural|neural/.test(name)) score += 25;
  if (voice.localService) score += 3;
  return score;
}
function isChineseVoice(voice) { const lang = (voice.lang || "").toLowerCase(); const name = (voice.name || "").toLowerCase(); return lang.startsWith("zh") || /mandarin|普通话|普通話|国语|國語|chinese|中文/.test(name); }
function refreshVoices() {
  if (!("speechSynthesis" in window)) { updateVoiceSettingsUI(); return; }
  ttsSettings.voices = window.speechSynthesis.getVoices();
  ttsSettings.chineseVoices = ttsSettings.voices.filter(isChineseVoice).sort((a, b) => chineseVoiceScore(b) - chineseVoiceScore(a) || a.name.localeCompare(b.name, "zh-CN"));
  if (!ttsSettings.voices.length) { updateVoiceSettingsUI(); return; }
  if (!ttsSettings.chineseVoices.some((voice) => voice.voiceURI === ttsSettings.voiceURI) && ttsSettings.chineseVoices.length) {
    ttsSettings.voiceURI = ttsSettings.chineseVoices[0].voiceURI; saveTtsSettings();
  }
  updateVoiceSettingsUI();
}
function selectedChineseVoice() { return ttsSettings.chineseVoices.find((voice) => voice.voiceURI === ttsSettings.voiceURI) || ttsSettings.chineseVoices[0] || null; }
function speechSegments(text) { const clean = String(text || "").replace(/\s+/g, " ").trim(); return clean.match(/[^。！？；]+[。！？；]?/g)?.map((part) => part.trim()).filter(Boolean) || (clean ? [clean] : []); }
function createUtterance(text, runId, isLast) {
  const utterance = new SpeechSynthesisUtterance(text); const voice = selectedChineseVoice();
  if (voice) { utterance.voice = voice; utterance.lang = voice.lang || "zh-CN"; } else utterance.lang = "zh-CN";
  utterance.rate = ttsSettings.rate; utterance.pitch = ttsSettings.pitch; utterance.volume = ttsSettings.volume;
  utterance.onstart = () => { if (runId === speechRunId) agentSpeaker.classList.add("is-speaking"); };
  utterance.onend = () => { if (isLast && runId === speechRunId) agentSpeaker.classList.remove("is-speaking"); };
  utterance.onerror = () => { if (runId === speechRunId) agentSpeaker.classList.remove("is-speaking"); };
  return utterance;
}
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const segments = speechSegments(text); if (!segments.length) return;
  window.speechSynthesis.cancel(); const runId = ++speechRunId;
  segments.forEach((segment, index) => window.speechSynthesis.speak(createUtterance(segment, runId, index === segments.length - 1)));
}
function voiceOptionLabel(voice) { return `${voice.name} · ${voice.lang || "中文"} · ${voice.localService ? "本机" : "在线"}`; }
function updateVoiceSettingsUI() {
  if (!voiceSettingsDialog) return;
  const select = voiceSettingsDialog.querySelector("#agent-voice-select"); const status = voiceSettingsDialog.querySelector("#agent-voice-status");
  const rateInput = voiceSettingsDialog.querySelector("#agent-rate"); const rateValue = voiceSettingsDialog.querySelector("#agent-rate-value");
  if (!("speechSynthesis" in window)) { select.innerHTML = '<option value="">当前浏览器不支持 SpeechSynthesis</option>'; select.disabled = true; status.textContent = "不能播放合成语音，游戏仍可正常使用。"; }
  else if (!ttsSettings.voices.length) { select.innerHTML = '<option value="">正在读取浏览器声音……</option>'; select.disabled = true; status.textContent = "声音可能会在页面打开后稍晚出现。"; }
  else if (!ttsSettings.chineseVoices.length) { select.innerHTML = '<option value="">没有发现中文声音</option>'; select.disabled = true; status.textContent = "没有发现中文普通话声线，游戏仍可正常使用。"; }
  else { select.disabled = false; select.innerHTML = ttsSettings.chineseVoices.map((voice) => `<option value="${escapeHtml(voice.voiceURI)}" ${voice.voiceURI === ttsSettings.voiceURI ? "selected" : ""}>${escapeHtml(voiceOptionLabel(voice))}</option>`).join(""); status.textContent = `发现 ${ttsSettings.chineseVoices.length} 个中文声音。当前：${voiceOptionLabel(selectedChineseVoice())}`; }
  rateInput.value = String(ttsSettings.rate); rateValue.textContent = `${ttsSettings.rate.toFixed(2)}×`;
}
function createVoiceSettings() {
  const audioActions = document.createElement("div"); audioActions.className = "agent-audio-actions"; agentSpeaker.parentNode.insertBefore(audioActions, agentSpeaker); audioActions.append(agentSpeaker);
  const settingsButton = document.createElement("button"); settingsButton.className = "voice-settings-trigger"; settingsButton.type = "button"; settingsButton.textContent = "声音设置"; settingsButton.setAttribute("aria-label", "Agent 声音设置和试听"); audioActions.append(settingsButton);
  voiceSettingsDialog = document.createElement("dialog"); voiceSettingsDialog.className = "voice-settings-dialog"; voiceSettingsDialog.setAttribute("aria-labelledby", "voice-settings-title");
  voiceSettingsDialog.innerHTML = `<div class="voice-settings-card"><div class="voice-settings-heading"><div><p class="voice-settings-kicker">Agent助教</p><h2 id="voice-settings-title">声音设置与试听</h2></div><button class="voice-settings-close" type="button" aria-label="关闭声音设置">×</button></div><label class="voice-field" for="agent-voice-select"><span>中文声音</span><select id="agent-voice-select"></select></label><p class="voice-settings-status" id="agent-voice-status" role="status">正在读取浏览器声音……</p><label class="voice-field voice-rate" for="agent-rate"><span>语速 <output id="agent-rate-value">${ttsSettings.rate.toFixed(2)}×</output></span><input id="agent-rate" type="range" min="0.75" max="1.10" step="0.05" value="${ttsSettings.rate}" /></label><div class="voice-preview"><small>试听文本</small><p>${TTS_PREVIEW_TEXT}</p></div><div class="voice-settings-actions"><button class="button button-quiet" id="refresh-agent-voices" type="button">重新读取</button><button class="button button-secondary" id="preview-agent-voice" type="button">🔊 试听</button></div><p class="voice-settings-note">选择和语速会保存在这个浏览器中。</p></div>`;
  document.body.append(voiceSettingsDialog);
  settingsButton.addEventListener("click", () => { refreshVoices(); if (typeof voiceSettingsDialog.showModal === "function") voiceSettingsDialog.showModal(); else voiceSettingsDialog.setAttribute("open", ""); });
  voiceSettingsDialog.querySelector(".voice-settings-close").addEventListener("click", () => voiceSettingsDialog.close());
  voiceSettingsDialog.addEventListener("click", (event) => { if (event.target === voiceSettingsDialog) voiceSettingsDialog.close(); });
  voiceSettingsDialog.querySelector("#agent-voice-select").addEventListener("change", (event) => { ttsSettings.voiceURI = event.target.value; saveTtsSettings(); updateVoiceSettingsUI(); });
  voiceSettingsDialog.querySelector("#agent-rate").addEventListener("input", (event) => { ttsSettings.rate = normalizeRate(event.target.value); saveTtsSettings(); updateVoiceSettingsUI(); });
  voiceSettingsDialog.querySelector("#refresh-agent-voices").addEventListener("click", refreshVoices);
  voiceSettingsDialog.querySelector("#preview-agent-voice").addEventListener("click", () => speak(TTS_PREVIEW_TEXT));
  window.speechSynthesis?.addEventListener?.("voiceschanged", refreshVoices); refreshVoices();
}

function setAgent(message, status = "thinking") {
  const states = { thinking: ["主持游戏", "💭"], rolling: ["骰子转起来", "🎲"], timer: ["快速挑战", "⏱️"], moving: ["棋子出发", "🧭"], hint: ["给一点提示", "💡"], listening: ["正在听", "🎤"], diagnosis: ["句子诊断", "🧐"], corrected: ["被大家纠正", "😅"], success: ["一起成功", "✨"], lucky: ["幸运事件", "🎁"] };
  const [label, icon] = states[status] || states.thinking; agentPanel.dataset.state = status; agentStatus.textContent = label; agentStateIcon.textContent = icon; agentMessage.textContent = message; agentSpeaker.dataset.speak = message;
}
function speechButton(text, label = "朗读这句话") { return `<button class="icon-button js-speak" type="button" data-speak="${escapeHtml(text)}" aria-label="${label}" title="朗读">🔊</button>`; }
function voiceButton(context) { return `<button class="button button-mic" type="button" data-action="voice" data-context="${context}">🎤 我来说</button>`; }
function voiceResult(context) {
  if (state.voice.context !== context || (!state.voice.status && !state.voice.transcript)) return "";
  return `<div class="voice-result" role="status"><span>🎤</span><strong>${state.voice.transcript ? `我听到：${escapeHtml(state.voice.transcript)}` : escapeHtml(state.voice.status)}</strong></div>`;
}

function renderHud() {
  const team = currentTeam(); currentTeamLabel.textContent = `${team.icon} ${team.team}`; currentTeamLabel.className = `team-${team.key}`;
  turnLabel.textContent = `第 ${state.round} 轮`; missionCount.textContent = `${state.coreCompleted} / ${CORE_TARGET}`;
  const percent = Math.min(100, (state.coreCompleted / CORE_TARGET) * 100); progressFill.style.width = `${percent}%`; missionProgress.setAttribute("aria-valuenow", String(state.coreCompleted));
  finalButton.hidden = !state.finalUnlocked || state.final.active || state.final.completed;
  progressNote.textContent = state.final.completed ? "冒险完成！" : state.finalUnlocked ? "最终挑战已解锁，全班一起完成！" : `完成 ${CORE_TARGET} 次核心互动，解锁最终挑战`;
}

function renderTeams() {
  return `<div class="team-strip" aria-label="四队位置">${state.teams.map((team, index) => `<article class="team-card team-${team.key} ${index === state.currentTeam && !state.final.active ? "is-current" : ""}" data-team-index="${index}"><span class="team-icon" aria-hidden="true">${team.icon}</span><div><strong>${team.team}</strong><small data-team-position>第 ${team.position} 格</small></div>${team.freeHints ? `<span class="team-bonus" title="免费提示">💡${team.freeHints}</span>` : ""}</article>`).join("")}</div>`;
}

function renderMap() {
  const cells = pathNodes.map((node, index) => {
    const pawns = state.teams.map((team, teamIndex) => team.position === index ? `<span class="pawn team-${team.key} ${teamIndex === state.currentTeam ? "is-current" : ""}" data-pawn-team="${teamIndex}" title="${team.team}" aria-label="${team.team}">${team.icon}</span>` : "").join("");
    return `<article class="map-node node-${node.type} ${currentTeam().position === index ? "has-current" : ""}" data-node-index="${index}" style="--row:${node.row};--col:${node.col}" aria-label="第${index}格，${node.label}"><span class="node-number">${index}</span><span class="node-icon" aria-hidden="true">${node.icon}</span><strong>${node.label}</strong><div class="pawn-stack">${pawns}</div></article>`;
  }).join("");
  return `<div class="map-board"><div class="map-decor decor-one" aria-hidden="true">🍁</div><div class="map-decor decor-two" aria-hidden="true">🍃</div><div class="route-line route-line-a" aria-hidden="true"></div><div class="route-line route-line-b" aria-hidden="true"></div>${cells}</div>`;
}

function renderDiceDock() {
  const team = currentTeam(); const busy = !["ready"].includes(state.phase) || state.finalUnlocked;
  const label = state.phase === "rolling" ? "骰子滚动中" : state.phase === "moving" ? "棋子正在移动" : state.finalUnlocked ? "最终挑战已解锁" : `${team.team}，掷骰子！`;
  return `<section class="dice-dock"><div class="dice ${state.phase === "rolling" ? "is-rolling" : ""}" id="dice-value" aria-label="骰子点数 ${state.die || "未掷"}">${state.die || "?"}</div><div><span class="dice-team">${team.icon} ${team.team}</span><strong id="dice-status">${label}</strong><small>每次掷骰子都有行动</small></div><button class="button button-roll" type="button" data-action="roll" ${busy ? "disabled" : ""}>🎲 掷骰子</button></section>`;
}

function challengerInstruction(type) {
  const instructions = {
    charade: "请你看动作卡并表演，不能说话。",
    diagnosis: "请你先判断，再口头帮助 Agent 修改。",
    agent: "请你帮助 Agent 把句子说得更好。",
    picture: "请你看图，用中文回答。",
    change: "请你根据以前和现在说出变化。",
  };
  return instructions[type] || "请你接受挑战。";
}
function renderChallengerControl(task) {
  if (!task.challengerEnabled || task.completed) return "";
  const challenger = state.challenger;
  return `<section class="challenger-control ${challenger.current ? "has-student" : ""}" aria-live="polite" aria-label="随机挑战者"><span class="challenger-target" aria-hidden="true">🎯</span><div><span>个人挑战 · 可选</span>${challenger.current ? `<strong>请 <b class="challenger-number">${challenger.current}</b> 号同学完成挑战</strong><small>${challengerInstruction(task.type)}</small>` : `<strong>随机邀请一位同学</strong><small>教师点击抽取；本局优先不重复。</small>`}</div><button class="button ${challenger.current ? "button-quiet" : "button-challenge"} button-large" type="button" data-action="draw-challenger" ${challenger.rolling ? "disabled" : ""}>${challenger.current ? "换一位" : "开始抽取"}</button></section>`;
}

function renderMemoryBoard(task) {
  const card = (item, kind) => {
    const selected = kind === "season" ? task.selectedSeason === item.key : task.selectedActivity === item.key;
    const matched = task.matchedKeys.includes(item.key);
    const wrong = task.wrongPair && task.wrongPair[kind] === item.key;
    return `<button class="memory-match-card ${selected ? "is-selected" : ""} ${matched ? "is-matched" : ""} ${wrong ? "is-wrong" : ""}" type="button" data-action="memory-${kind}" data-key="${item.key}" aria-pressed="${selected}" ${matched ? "disabled" : ""}><span aria-hidden="true">${item.icon}</span><strong>${escapeHtml(item.text)}</strong>${matched ? `<b aria-hidden="true">✓</b>` : ""}</button>`;
  };
  const allMatched = task.matchedKeys.length === memoryPairs.length;
  const status = allMatched
    ? `<strong>🎉 配对完成！</strong><p>四组季节和活动都找到了。</p>`
    : task.lastMatch
      ? `<strong>${escapeHtml(task.lastMatch.season)} → ${escapeHtml(task.lastMatch.activity)} ✓</strong><p>继续选择下一组。</p>`
      : `<strong>${escapeHtml(task.feedback || "先选一张季节卡，再选一张活动卡。")}</strong><p>根据本题图片配对；有些活动在生活中也可以属于别的季节。</p>`;
  return `<div class="memory-play"><div class="memory-match-row" aria-label="季节卡片"><small>上排 · 季节</small><div>${task.seasons.map((item) => card(item, "season")).join("")}</div></div><div class="memory-link" aria-hidden="true">选择一组 ↓</div><div class="memory-match-row activities" aria-label="活动卡片"><small>下排 · 活动（每次新任务随机排列）</small><div>${task.activities.map((item) => card(item, "activity")).join("")}</div></div><div class="memory-status ${task.wrongPair ? "is-wrong" : ""}" role="status">${status}</div></div>`;
}

function renderChangeTaskOverlay(task, team) {
  const data = currentTaskData(task); const round = task.roundIndex + 1;
  const progress = task.rounds.map((_, index) => `<span class="${index < task.roundIndex || task.completed ? "is-done" : index === task.roundIndex ? "is-current" : ""}">${index + 1}</span>`).join("");
  const continueLabel = state.finalUnlocked ? "完成，回到地图" : "继续冒险";
  if (task.completed) {
    return `<div class="task-backdrop"><section class="task-card type-change change-round-card" role="dialog" aria-modal="true" aria-labelledby="task-title"><header class="task-header"><div><span class="task-type">⚡ “了”的变化挑战</span><small>4轮 · 4位同学 · 口头回答</small></div><span class="task-team team-${team.key}">${team.icon} ${team.team}</span></header><div class="change-rounds" aria-label="四轮全部完成">${progress}</div><div class="change-complete"><span aria-hidden="true">🎉</span><h2 id="task-title">“了”的变化挑战完成！</h2><p>四位同学从不同角度说出了“现在和以前不一样”。</p></div><button class="button button-primary button-large continue-button" type="button" data-action="task-continue">${continueLabel} →</button></section></div>`;
  }
  const picker = task.roundPhase === "draw"
    ? `<div class="change-student-picker" aria-live="polite"><span aria-hidden="true">🎯</span><div><small>第 ${round} / 4 轮</small><strong>先抽取本轮回答的同学</strong><p>抽取后再展示情境，不提前公布答案。</p></div><button class="button button-challenge button-large" type="button" data-action="change-draw-student" ${state.challenger.rolling ? "disabled" : ""}>抽取学生</button></div>`
    : `<div class="change-student-result" aria-live="polite"><span>第 ${round} / 4 轮</span><strong>🎯 请 <b>${task.currentStudent}</b> 号同学回答</strong></div>`;
  const scene = task.roundPhase === "draw" ? `<div class="change-scene-covered"><span aria-hidden="true">⚡</span><strong>抽到同学后，打开本轮变化情境</strong></div>` : `<div class="change-play"><article><small>以前</small><span aria-hidden="true">${data.beforeIcon}</span><strong>${escapeHtml(data.before.replace(/^原来：|^九月南京：|^早上：|^刚才：/, ""))}</strong></article><div><b aria-hidden="true">→</b><em>不一样了</em></div><article><small>现在</small><span aria-hidden="true">${data.nowIcon}</span><strong>${escapeHtml(data.now.replace(/^现在：|^十月南京：|^中午：/, ""))}</strong></article></div>`;
  let controls = "";
  if (task.roundPhase === "answer") {
    const hint = task.hintShown ? `<div class="hint-card"><span>关键词提示</span><strong>${escapeHtml(data.keywords)}</strong></div>` : "";
    const reference = task.referenceVisible ? `<div class="reference-reveal"><span>参考表达</span><p>${escapeHtml(data.reference)}</p>${speechButton(data.reference)}</div>` : "";
    const support = hint || reference ? `<div class="change-answer-support">${hint}${reference}</div>` : "";
    controls = `<h2 id="task-title">${escapeHtml(data.prompt)}</h2>${support}<div class="change-teacher-controls"><button class="button button-success button-large" type="button" data-action="change-correct">✓ 回答正确</button><button class="button button-hint button-large" type="button" data-action="change-retry">↻ 再想一想</button><button class="button button-quiet" type="button" data-action="change-reference" ${task.referenceVisible ? "disabled" : ""}>查看参考答案</button></div>`;
  }
  if (task.roundPhase === "feedback") {
    const alternatives = data.acceptable?.length ? `<small>其他合理表达：${escapeHtml(data.acceptable.join(" / "))}</small>` : "";
    controls = `<div class="change-round-feedback" role="status"><strong>✓ ${task.currentStudent}号同学完成本轮</strong><p>${escapeHtml(data.reference)}</p>${alternatives}${speechButton(data.reference)}</div><button class="button button-primary button-large continue-button" type="button" data-action="${round < 4 ? "change-next-round" : "change-finish"}">${round < 4 ? "抽下一位同学 →" : "完成四轮挑战 →"}</button>`;
  }
  return `<div class="task-backdrop"><section class="task-card type-change change-round-card" role="dialog" aria-modal="true" aria-labelledby="task-title"><header class="task-header"><div><span class="task-type">⚡ “了”的变化挑战</span><small>${escapeHtml(data.category)} · 4轮不同角度</small></div><span class="task-team team-${team.key}">${team.icon} ${team.team}</span></header><div class="change-rounds" aria-label="当前第${round}轮">${progress}</div>${picker}${scene}${controls}</section></div>`;
}

function renderPlayVisual(task) {
  const data = currentTaskData(task);
  if (task.type === "memory") return renderMemoryBoard(task);
  if (task.type === "picture") {
    return `<div class="picture-play" aria-label="看图情境"><span aria-hidden="true">${data.scene}</span><small>先看图，不看答案</small></div>`;
  }
  if (task.type === "charade") {
    const round = task.charadeRound + 1; const total = task.data.rounds.length;
    if (!task.wordRevealed) {
      return `<div class="charade-secret"><small>第 ${round} / ${total} 轮</small><span aria-hidden="true">🎭</span><strong>其他同学先不要看！</strong><p>请一名表演者点击，看看要做什么动作。</p><button class="button button-challenge button-large" type="button" data-action="reveal-word">👀 表演者看动作</button></div>`;
    }
    return `<div class="charade-word"><small>第 ${round} / ${total} 轮 · 只有表演者看</small><span aria-hidden="true">${data.emoji}</span><strong>${escapeHtml(data.actionCue)}</strong><p>目标：${escapeHtml(data.word)}。不能说中文，用动作表演！</p></div>`;
  }
  if (task.type === "dialogue") {
    return `<div class="dialogue-play" aria-label="两人对话角色卡">${data.roles.map((line, index) => `<article class="role-${line.startsWith("A") ? "a" : "b"}"><span>${line.startsWith("A") ? "学生 A" : "学生 B"}</span><p>${escapeHtml(line.replace(/^[AB]：/, ""))}</p>${index < data.roles.length - 1 ? `<i aria-hidden="true">${line.startsWith("A") ? "→" : "←"}</i>` : ""}</article>`).join("")}</div>`;
  }
  if (task.type === "agent") {
    return `<div class="agent-challenge-play"><div class="mini-change"><span>${escapeHtml(data.before)}</span><b aria-hidden="true">→</b><span>${escapeHtml(data.now)}</span></div><div class="agent-bubble"><span aria-hidden="true">🤖</span><blockquote>${escapeHtml(data.prompt.replace(/^Agent说：/, ""))}</blockquote></div></div>`;
  }
  if (task.type === "diagnosis") {
    const context = data.before
      ? `<div class="diagnosis-context"><span>${escapeHtml(data.before)}</span><b aria-hidden="true">→</b><span>${escapeHtml(data.now)}</span></div>`
      : `<div class="diagnosis-scene" aria-hidden="true">${data.scene}</div>`;
    return `<div class="diagnosis-play">${context}<div class="diagnosis-agent"><span aria-hidden="true">🤖</span><div><small>${escapeHtml(data.category)}</small><blockquote>${escapeHtml(data.sentence)}</blockquote></div></div></div>`;
  }
  if (task.type === "change") {
    return `<div class="change-play"><article><small>以前</small><span aria-hidden="true">${data.beforeIcon}</span><strong>${escapeHtml(data.before.replace(/^以前：|^九月：/, ""))}</strong></article><div><b aria-hidden="true">→</b><em>不一样</em></div><article><small>现在</small><span aria-hidden="true">${data.nowIcon}</span><strong>${escapeHtml(data.now.replace(/^现在：|^十月：/, ""))}</strong></article></div>`;
  }
  if (task.type === "timed") {
    const seconds = Number.isFinite(task.timeLeft) ? task.timeLeft : data.seconds;
    const timerState = task.timerDone ? "时间到，也可以继续说！" : task.timerStarted ? `${seconds} 秒` : "准备好再开始";
    const changeScene = data.before ? `<div class="timed-scenes"><span>${escapeHtml(data.before)}</span><b>→</b><span>${escapeHtml(data.now)}</span></div>` : `<div class="timed-emoji" aria-hidden="true">${data.scene}</div>`;
    return `<div class="timed-play ${task.timerStarted && !task.timerDone ? "is-running" : ""}"><div class="timer-face" role="timer" aria-label="快速挑战计时">${task.timerDone ? "✓" : seconds}</div><div><strong>${timerState}</strong><p>时间到也不扣分。</p></div>${!task.timerStarted ? `<button class="button button-challenge" type="button" data-action="start-timer">⏱️ 开始10秒</button>` : ""}${changeScene}<div class="timer-track"><span style="--time-progress:${Math.max(0, seconds / data.seconds) * 100}%"></span></div></div>`;
  }
  return `<div class="task-scene" aria-hidden="true">${data.scene || task.scene || taskMeta[task.type].icon}</div>`;
}

function renderTaskOverlay() {
  const task = state.task; if (!task) return "";
  const meta = taskMeta[task.type]; const data = currentTaskData(task); const team = currentTeam();
  if (task.type === "change" && task.rounds) return renderChangeTaskOverlay(task, team);
  const hint = task.hintLevel ? data.hints?.[Math.min(task.hintLevel, data.hints.length) - 1] : "";
  let interaction = "";
  if (task.type === "lucky" || task.type === "quick") {
    interaction = `<div class="event-result"><span>${task.resultIcon}</span><strong>${task.result}</strong><p>${task.detail}</p></div>`;
  } else if (task.type === "memory" && !task.completed) {
    interaction = task.matchedKeys.length === memoryPairs.length
      ? `<div class="oral-actions"><button class="button button-success button-large" type="button" data-action="memory-complete">✓ 配对完成，继续</button></div>`
      : `<button class="button button-hint" type="button" data-action="task-hint">💡 请求提示</button>`;
  } else if (task.type === "diagnosis" && !task.completed) {
    if (!task.judged) {
      interaction = `<div class="diagnosis-choices" aria-label="判断句子"><button class="button button-success button-large" type="button" data-action="diagnosis-choice" data-choice="valid">✅ 这个句子可以</button><button class="button button-bomb button-large" type="button" data-action="diagnosis-choice" data-choice="issue">💣 这个句子有问题</button></div>`;
    } else if (!task.judgementCorrect) {
      interaction = `<div class="diagnosis-result is-boom" role="status"><span aria-hidden="true">💣</span><div><strong>再看看这个地方</strong><p>${escapeHtml(task.feedback)}</p></div></div><div class="diagnosis-followup"><button class="button button-hint" type="button" data-action="task-hint">💡 请求提示</button><button class="button button-quiet" type="button" data-action="diagnosis-retry">🔄 再判断一次</button></div>`;
    } else {
      const resolveLabel = data.verdict === "valid" && data.reference !== data.sentence ? "✨ 帮 Agent 说得更好" : data.verdict === "issue" ? "🔍 找到问题，帮 Agent 修改" : "🙂 看看分析";
      interaction = `<div class="diagnosis-result is-caught" role="status"><span aria-hidden="true">😄</span><div><strong>抓到啦！</strong><p>${escapeHtml(task.feedback)}</p></div></div><div class="diagnosis-followup"><button class="button button-hint" type="button" data-action="task-hint">💡 请求提示</button><button class="button button-primary" type="button" data-action="diagnosis-resolve">${resolveLabel}</button></div>`;
    }
  } else if (data.challenge && !task.challengeAccepted && !task.completed) {
    interaction = `<div class="judgement-row"><button class="button button-quiet button-large" type="button" data-action="agent-okay">👍 可以</button><button class="button button-challenge button-large" type="button" data-action="agent-improve">✨ 还能更好</button></div>${task.feedback ? `<div class="feedback gentle">${task.feedback}</div>` : ""}`;
  } else if (task.type === "charade" && !task.wordRevealed && !task.completed) {
    interaction = "";
  } else if (task.type === "charade" && !task.completed) {
    interaction = `${task.hintLevel > 1 ? `<div class="sentence-frame">${data.frame}</div>` : ""}<div class="oral-actions"><button class="button button-success button-large" type="button" data-action="charade-round-complete">✅ 这一轮猜到了</button><button class="button button-hint" type="button" data-action="task-hint">💡 请求提示${team.freeHints ? `（免费 ${team.freeHints}）` : ""}</button></div><div class="charade-rounds" aria-label="动作任务进度">${task.data.rounds.map((_, index) => `<span class="${index < task.charadeRound ? "is-done" : index === task.charadeRound ? "is-current" : ""}">${index + 1}</span>`).join("")}</div>`;
  } else if (task.type === "timed" && !task.timerStarted && !task.completed) {
    interaction = "";
  } else if (data.oral && !task.completed) {
    interaction = `${data.frame && task.hintLevel > 1 ? `<div class="sentence-frame">${data.frame}</div>` : ""}<div class="oral-actions">${voiceButton("task")}<button class="button button-success button-large" type="button" data-action="task-complete">✅ 已完成</button><button class="button button-hint" type="button" data-action="task-hint">💡 请求提示${team.freeHints ? `（免费 ${team.freeHints}）` : ""}</button></div>${voiceResult("task")}`;
  } else if (!task.completed) {
    interaction = `<div class="option-grid">${data.options.map((option) => `<button class="option-button" type="button" data-action="task-option" data-option="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("")}</div><button class="button button-hint" type="button" data-action="task-hint">💡 请求提示${team.freeHints ? `（免费 ${team.freeHints}）` : ""}</button>`;
  }
  const completed = task.completed && !["lucky", "quick"].includes(task.type) ? `<div class="reference-reveal"><span>Agent参考表达</span><p>${escapeHtml(task.reference || data.reference || "做得好！")}</p>${(task.explanation || data.explanation) ? `<small>${escapeHtml(task.explanation || data.explanation)}</small>` : ""}${speechButton(task.reference || data.reference || "做得好！")}</div>` : "";
  const continueLabel = state.finalUnlocked ? "完成，回到地图" : task.type === "lucky" && state.keepTurn ? `${team.team}再掷一次` : "继续冒险";
  return `<div class="task-backdrop"><section class="task-card type-${task.type}" role="dialog" aria-modal="true" aria-labelledby="task-title"><header class="task-header"><div><span class="task-type">${meta.icon} ${meta.label}</span><small>${meta.interaction}</small></div><span class="task-team team-${team.key}">${team.icon} ${team.team}</span></header>${renderChallengerControl(task)}${renderPlayVisual(task)}<h2 id="task-title">${escapeHtml(data.prompt || task.prompt)}</h2>${hint && !task.completed ? `<div class="hint-card"><span>提示 ${task.hintLevel}</span><strong>${escapeHtml(hint)}</strong></div>` : ""}${task.feedback && !data.challenge && task.type !== "diagnosis" && task.type !== "memory" ? `<div class="feedback ${task.completed ? "success" : "gentle"}">${escapeHtml(task.feedback)}</div>` : ""}${interaction}${completed}${(task.completed || task.type === "lucky" || task.type === "quick") ? `<button class="button button-primary button-large continue-button" type="button" data-action="task-continue">${continueLabel} →</button>` : ""}</section></div>`;
}

function voteWinners() {
  const max = Math.max(...Object.values(state.vote.votes)); return max === 0 ? [] : seasons.filter((season) => state.vote.votes[season.key] === max);
}
function joinChinese(items) { return items.length < 2 ? items.join("") : `${items.slice(0, -1).join("、")}和${items[items.length - 1]}`; }
function voteSummaryText() {
  const winners = voteWinners(); if (!winners.length) return "还没有投票。";
  const max = state.vote.votes[winners[0].key];
  return winners.length === 1
    ? `${winners[0].name}有${max}票，是大家最喜欢的季节！`
    : `${joinChinese(winners.map((season) => season.name))}都是${max}票！`;
}
function renderVoteResult() {
  const winners = voteWinners(); const focus = winners[0];
  if (!state.vote.revealed || !focus) return "";
  const summary = voteSummaryText();
  return `<div class="vote-result" role="status"><p><strong>${summary}</strong></p><div class="teacher-followup"><span>👩‍🏫 老师可以追问</span><b>为什么喜欢${focus.name}？</b></div>${speechButton(summary, "朗读投票结果")}</div>`;
}
function voteFillPercent(votes) { return Math.min(100, Math.round((votes / VOTE_SCALE) * 10000) / 100); }
function renderVoteOverlay() {
  if (state.mode !== "vote") return "";
  const total = Object.values(state.vote.votes).reduce((sum, value) => sum + value, 0);
  return `<div class="tool-page"><div class="tool-page-heading"><button class="button button-quiet" type="button" data-action="go-home">← 返回教师控制台</button><div><span class="section-kicker">1–2分钟 · 全班互动</span><h2 id="vote-title">🗳️ 你最喜欢什么季节？</h2></div></div><section class="vote-card standalone-card" aria-labelledby="vote-title"><header class="task-header"><div><span class="task-type">全班投票</span><small>每位同学投一票 · 满格约 ${VOTE_SCALE} 票</small></div><span class="task-team">全班一起</span></header><div class="vote-grid">${seasons.map((season) => `<button class="vote-option scene-${season.key}" type="button" data-action="vote-add" data-season="${season.key}" style="--vote:${voteFillPercent(state.vote.votes[season.key])}%"><span>${season.icon}</span><strong>${season.name}</strong><b data-vote-count>${state.vote.votes[season.key]}</b></button>`).join("")}</div><div class="vote-controls"><strong class="vote-total">全班：${total} 票</strong><button class="button button-quiet" type="button" data-action="vote-undo" ${state.vote.history.length ? "" : "disabled"}>撤销上一票</button><button class="button button-quiet" type="button" data-action="vote-reset" ${total ? "" : "disabled"}>重新投票</button><button class="button button-primary" type="button" data-action="vote-reveal" ${total ? "" : "disabled"}>看看结果</button></div>${renderVoteResult()}</section></div>`;
}

function updateVoteOption(key) {
  const option = stage.querySelector(`[data-action="vote-add"][data-season="${key}"]`); if (!option) return;
  const votes = state.vote.votes[key]; option.style.setProperty("--vote", `${voteFillPercent(votes)}%`);
  const count = option.querySelector("[data-vote-count]"); if (count) count.textContent = String(votes);
}
function syncVoteControls() {
  const total = Object.values(state.vote.votes).reduce((sum, value) => sum + value, 0);
  const totalLabel = stage.querySelector(".vote-total"); if (totalLabel) totalLabel.textContent = `全班：${total} 票`;
  const undo = stage.querySelector('[data-action="vote-undo"]'); if (undo) undo.disabled = state.vote.history.length === 0;
  const reset = stage.querySelector('[data-action="vote-reset"]'); if (reset) reset.disabled = total === 0;
  const reveal = stage.querySelector('[data-action="vote-reveal"]'); if (reveal) reveal.disabled = total === 0;
}
function clearVoteResult() {
  state.vote.revealed = false; state.vote.reason = ""; stage.querySelector(".vote-result")?.remove();
}
function showVoteResult() {
  stage.querySelector(".vote-result")?.remove();
  stage.querySelector(".vote-card")?.insertAdjacentHTML("beforeend", renderVoteResult());
}

function renderTeacherConsole() {
  const gameNote = state.coreCompleted
    ? `已完成 ${state.coreCompleted} / ${CORE_TARGET} 个核心任务，可以继续。`
    : "课末8–10分钟综合复习";
  return `<section class="teacher-console" aria-labelledby="console-title"><div class="console-intro"><span class="section-kicker">教师控制台</span><h2 id="console-title">今天想让 Agent 在什么时候加入？</h2><p>老师掌握节奏，学生开口参与，Agent负责出题、提示和简短反馈。</p></div><div class="tool-entry-grid"><button class="tool-entry tool-entry-quick" type="button" data-action="open-mode" data-mode="quick"><span aria-hidden="true">⚡</span><div><strong>快问快答</strong><small>讲完一个知识点后快速检查</small><em>约 1–2 分钟</em></div></button><button class="tool-entry tool-entry-vote" type="button" data-action="open-mode" data-mode="vote"><span aria-hidden="true">🗳️</span><div><strong>全班投票</strong><small>20+名学生逐票参与</small><em>约 2 分钟</em></div></button><button class="tool-entry tool-entry-game" type="button" data-action="open-mode" data-mode="game"><span aria-hidden="true">🎮</span><div><strong>四季大冒险</strong><small>地图、四队、骰子与综合任务</small><em>${gameNote}</em></div></button></div><div class="collaboration-line" aria-label="师生机协同关系"><span>👩‍🏫 老师组织</span><b aria-hidden="true">→</b><span>👨‍🎓 学生表达</span><b aria-hidden="true">→</b><span>🤖 Agent助教</span><b aria-hidden="true">→</b><span>👩‍🏫 老师推进</span></div></section>`;
}

function quickQuestionsFor(category) {
  return category === "all" ? quickQuestionBank : quickQuestionBank.filter((item) => item.category === category);
}
function chooseNextQuickQuestion(category = state.quickTool.category) {
  const pool = quickQuestionsFor(category);
  let candidates = pool.filter((item) => !state.quickTool.recentKeys.includes(item.key));
  if (!candidates.length) candidates = [...pool];
  const question = candidates[Math.floor(Math.random() * candidates.length)];
  state.quickTool.category = category;
  state.quickTool.question = question;
  state.quickTool.recentKeys = [...state.quickTool.recentKeys, question.key].slice(-5);
  state.quickTool.hint = 0;
  state.quickTool.answered = false;
  state.quickTool.count += 1;
  state.voice = { context: "", status: "", transcript: "" };
}
function renderQuickTool() {
  const quick = state.quickTool;
  if (!quick.question) chooseNextQuickQuestion();
  const question = quick.question;
  const hint = quick.hint ? question.hints[Math.min(quick.hint, question.hints.length) - 1] : "";
  const categories = [{ key: "all", label: "全部" }, { key: "season", label: "季节" }, { key: "weather", label: "天气" }, { key: "activity", label: "活动" }];
  return `<div class="tool-page"><div class="tool-page-heading"><button class="button button-quiet" type="button" data-action="go-home">← 返回教师控制台</button><div><span class="section-kicker">1–2分钟 · 口头检查</span><h2>⚡ 快问快答</h2></div></div><section class="quick-tool-card standalone-card"><div class="quick-category-tabs" aria-label="选择题目类别">${categories.map((category) => `<button type="button" data-action="quick-category" data-category="${category.key}" class="${quick.category === category.key ? "is-selected" : ""}" aria-pressed="${quick.category === category.key}">${category.label}</button>`).join("")}</div><div class="quick-question-scene" aria-hidden="true">${question.icon}</div><span class="quick-question-type">${question.label} · 第 ${quick.count} 题</span><h2>${escapeHtml(question.prompt)}</h2>${hint && !quick.answered ? `<div class="hint-card"><span>提示 ${quick.hint}</span><strong>${escapeHtml(hint)}</strong></div>` : ""}${quick.answered ? `<div class="reference-reveal"><span>Agent参考表达</span><p>${escapeHtml(question.reference)}</p>${speechButton(question.reference)}</div>` : `<div class="oral-actions">${voiceButton("quick-tool")}<button class="button button-success button-large" type="button" data-action="quick-complete">✅ 学生已经回答</button><button class="button button-hint" type="button" data-action="quick-hint">💡 给一点提示</button></div>${voiceResult("quick-tool")}`}<div class="quick-tool-footer">${speechButton(question.prompt, "朗读题目")}<button class="button button-primary button-large" type="button" data-action="quick-next">${quick.answered ? "下一题 →" : "换一题"}</button></div></section></div>`;
}

function switchMode(mode) {
  window.clearInterval(challengeTimer);
  challengerRunId += 1;
  if (state.mode === "game" && state.task?.type === "timed" && state.task.timerStarted && !state.task.timerDone) {
    state.task.timerDone = true;
    state.task.timeLeft = 0;
  }
  state.challenger.rolling = false;
  recognition?.abort();
  state.mode = mode;
  state.voice = { context: "", status: "", transcript: "" };
  if (mode === "home") setAgent("老师，请选择今天需要的课堂工具。", "thinking");
  if (mode === "quick") { if (!state.quickTool.question) chooseNextQuickQuestion(); setAgent("我来快速提问，学生口头回答，老师决定什么时候看参考表达。", "thinking"); }
  if (mode === "vote") { state.vote.active = true; setAgent("请每位同学投一票。票数会留在这里，直到老师重置。", "thinking"); }
  if (mode === "game") setAgent(state.coreCompleted ? `${currentTeam().team}，继续四季大冒险！` : "四支队伍准备好了吗？春队先来！", "thinking");
  render();
}

function renderFinalOverlay() {
  if (!state.final.active && !state.final.completed) return "";
  if (state.final.completed) return `<div class="final-screen"><div class="final-confetti" aria-hidden="true">🏆　✨　🍁</div><p class="section-kicker">四支队伍完成综合挑战</p><h2>🎉 四季大冒险完成！</h2><div class="agent-final-summary"><span aria-hidden="true">🤖</span><p><strong>太棒了！</strong>你们已经会说季节、天气、活动和天气的变化了！</p>${speechButton("太棒了！你们已经会说季节、天气、活动和天气的变化了！")}</div><div class="recap"><h3>全班一起复现了：</h3><ul><li>✓ 季节与顺序</li><li>✓ 天气与活动</li><li>✓ 用“了”说变化</li><li>✓ 发现并修改偏误</li></ul></div><div class="final-banner">🍂 南京的秋天来了！<br /><small>冒险完成！</small></div><div class="final-end-actions"><button class="button button-primary" type="button" data-action="go-home">返回教师控制台</button><button class="button button-quiet" type="button" data-action="restart">再玩一次</button></div></div>`;

  const team = state.teams[state.final.teamIndex];
  const teamProgress = state.teams.map((item, index) => `<span class="${index < state.final.teamIndex ? "is-done" : index === state.final.teamIndex ? "is-current" : ""}">${item.icon} ${item.team}</span>`).join("");
  if (state.final.phase === "board") {
    const board = finalChallengeCategories.map((category) => `<article class="final-choice-category"><div><span aria-hidden="true">${category.icon}</span><strong>${category.label}</strong></div><div class="difficulty-buttons" aria-label="${category.label}难度">${[1, 2, 3].map((difficulty) => `<button type="button" data-action="final-select" data-category="${category.key}" data-difficulty="${difficulty}" aria-label="选择${category.label}${difficulty}星">${"★".repeat(difficulty)}</button>`).join("")}</div></article>`).join("");
    return `<div class="task-backdrop final-backdrop"><section class="final-card final-board-card" role="dialog" aria-modal="true" aria-labelledby="final-title"><div class="final-team-progress" aria-label="四队挑战进度">${teamProgress}</div><span class="final-kicker">🏆 综合挑战选题板 · ${state.final.teamIndex + 1} / 4</span><h2 id="final-title">${team.icon} ${team.team}，请选择类别和难度</h2><p class="final-board-note">学生讨论选择，教师在大屏上点击。星越多，表达越完整。</p><div class="final-choice-board">${board}</div></section></div>`;
  }

  const category = finalChallengeCategories.find((item) => item.key === state.final.selectedCategory);
  const challenge = state.final.challenge;
  const hint = state.final.hint ? challenge.hints[Math.min(state.final.hint, challenge.hints.length) - 1] : "";
  const visual = state.final.selectedCategory === "error"
    ? `<div class="final-error-play"><div><span>🤖</span><blockquote>${escapeHtml(challenge.visual.replace(/^🤖\s*/, ""))}</blockquote></div></div>`
    : `<div class="final-choice-visual" aria-hidden="true">${escapeHtml(challenge.visual)}</div>`;
  if (state.final.phase === "feedback") {
    return `<div class="task-backdrop final-backdrop"><section class="final-card" role="dialog" aria-modal="true" aria-labelledby="final-title"><div class="final-team-progress">${teamProgress}</div><span class="final-kicker">${category.icon} ${category.label} · ${"★".repeat(state.final.difficulty)}</span><h2 id="final-title">${team.icon} ${team.team}完成挑战！</h2>${visual}<div class="reference-reveal"><span>Agent参考表达</span><p>${escapeHtml(challenge.reference)}</p>${speechButton(challenge.reference)}</div><button class="button button-primary button-large continue-button" type="button" data-action="final-next-team">${state.final.teamIndex === 3 ? "完成冒险 →" : "下一队选题 →"}</button></section></div>`;
  }
  return `<div class="task-backdrop final-backdrop"><section class="final-card" role="dialog" aria-modal="true" aria-labelledby="final-title"><div class="final-team-progress">${teamProgress}</div><span class="final-kicker">${category.icon} ${category.label} · ${"★".repeat(state.final.difficulty)}</span><h2 id="final-title">${team.icon} ${team.team}的挑战</h2>${visual}<h3 class="final-prompt">${escapeHtml(challenge.prompt)}</h3>${hint ? `<div class="hint-card"><span>提示 ${state.final.hint}</span><strong>${escapeHtml(hint)}</strong></div>` : ""}${state.final.feedback ? `<div class="feedback gentle">${escapeHtml(state.final.feedback)}</div>` : ""}<div class="final-teacher-controls"><button class="button button-success button-large" type="button" data-action="final-correct">✓ 正确</button><button class="button button-hint button-large" type="button" data-action="final-hint">💡 给提示</button><button class="button button-quiet button-large" type="button" data-action="final-retry">↻ 再想想</button><button class="button button-quiet" type="button" data-action="final-back-board">重新选题</button></div></section></div>`;
}

function render() {
  document.body.dataset.mode = state.mode;
  gameHud.hidden = state.mode !== "game";
  legendPanel.hidden = state.mode !== "game";
  if (state.mode === "home") { stage.innerHTML = renderTeacherConsole(); return; }
  if (state.mode === "quick") { stage.innerHTML = renderQuickTool(); return; }
  if (state.mode === "vote") { stage.innerHTML = renderVoteOverlay(); return; }
  renderHud();
  stage.innerHTML = state.final.completed
    ? `<div class="stage-enter final-stage">${renderFinalOverlay()}</div>`
    : `<div class="stage-enter">${renderTeams()}${renderMap()}${renderDiceDock()}${renderTaskOverlay()}${renderFinalOverlay()}</div>`;
}

function currentTaskData(task) {
  if (!task) return {};
  if (task.type === "charade") return task.data.rounds[task.charadeRound] || task.data.rounds[0] || {};
  if (task.type === "change" && task.rounds) return task.rounds[task.roundIndex] || task.rounds[0] || {};
  return task.data || {};
}
function randomTaskIndex(type, bank) {
  if (bank.length < 2) return 0;
  let index = Math.floor(Math.random() * bank.length);
  while (index === taskSelectionMemory[type]) index = Math.floor(Math.random() * bank.length);
  taskSelectionMemory[type] = index; return index;
}
function drawCharadeRounds(bank) {
  let candidates = bank.filter((item) => !recentCharadeKeys.includes(item.key));
  if (candidates.length < 3) candidates = [...bank];
  const shuffled = [...candidates].sort(() => Math.random() - 0.5); const rounds = shuffled.slice(0, 3);
  recentCharadeKeys = [...recentCharadeKeys, ...rounds.map((item) => item.key)].slice(-6);
  return rounds;
}
function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}
function makeMemoryTask() {
  const seasons = memoryPairs.map((pair) => ({ key: pair.key, text: pair.season, icon: pair.seasonIcon, pair }));
  let activities = shuffled(memoryPairs.map((pair) => ({ key: pair.key, text: pair.activity, icon: pair.activityIcon, pair })));
  if (activities.every((activity, index) => activity.key === seasons[index].key)) activities = [...activities.slice(1), activities[0]];
  return {
    type: "memory",
    data: { prompt: "根据本题图片，把季节和活动配成四组。", hints: ["先看上排的季节。", "再看下排活动图片。"] },
    seasons,
    activities,
    selectedSeason: "",
    selectedActivity: "",
    matchedKeys: [],
    wrongPair: null,
    lastMatch: null,
    feedback: "",
    hintLevel: 0,
    completed: false,
  };
}
function makeChangeTask() {
  const categories = shuffled(Object.keys(changeChallengeBank)).slice(0, 4);
  const rounds = categories.map((category) => {
    const bank = changeChallengeBank[category];
    return bank[randomTaskIndex(`change-${category}`, bank)];
  });
  return {
    type: "change",
    rounds,
    roundIndex: 0,
    roundPhase: "draw",
    currentStudent: "",
    usedStudents: [],
    hintShown: false,
    referenceVisible: false,
    roundFeedback: "",
    completed: false,
  };
}
function chooseTask(type) {
  if (type === "memory") {
    state.taskCounters.memory += 1;
    return makeMemoryTask();
  }
  const bank = taskBanks[type];
  if (type === "charade") {
    const rounds = drawCharadeRounds(bank); state.taskCounters[type] += 1;
    return { type, data: { play: "charade", oral: true, rounds }, charadeRound: 0, roundReferences: [], hintLevel: 0, completed: false, feedback: "", challengeAccepted: true, wordRevealed: false, timerStarted: false, timerDone: false, judged: false, judgementCorrect: false };
  }
  if (type === "change") {
    state.taskCounters.change += 1;
    return makeChangeTask();
  }
  const index = randomTaskIndex(type, bank); const data = bank[index]; state.taskCounters[type] += 1;
  return { type, data, hintLevel: 0, completed: false, feedback: "", challengeAccepted: !data.challenge, wordRevealed: false, timerStarted: false, timerDone: false, timeLeft: data.seconds, judged: false, judgementCorrect: false };
}
function coreCategoryForType(type) {
  return Object.keys(CORE_COVERAGE_TYPES).find((category) => CORE_COVERAGE_TYPES[category].includes(type)) || "";
}
function missingCoreCategories() {
  return Object.keys(CORE_COVERAGE_TYPES).filter((category) => !state.coreCoverage[category]);
}
function weightedTaskType(types, nodeType) {
  let candidates = [...new Set(types)].filter((type) => CORE_TASK_TYPES.includes(type));
  if (state.coreCoverage.memory) candidates = candidates.filter((type) => type !== "memory");
  const lastType = state.recentCoreTypes[state.recentCoreTypes.length - 1];
  if (candidates.length > 1 && candidates.includes(lastType)) candidates = candidates.filter((type) => type !== lastType);
  const weighted = candidates.map((type) => {
    const category = coreCategoryForType(type);
    let weight = type === nodeType ? 5 : 1.4;
    if (category && !state.coreCoverage[category]) weight += state.coreCompleted >= 4 ? 6 : 2.5;
    if (type === "memory" && !state.coreCoverage.memory && state.coreCompleted >= 4) weight += 5;
    if (type === "change" && !state.coreCoverage.change && state.coreCompleted >= 6) weight += 6;
    weight /= 1 + (state.seenTypes[type] || 0) * 0.7;
    if (state.recentCoreTypes.includes(type)) weight *= 0.55;
    return { type, weight };
  });
  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let cursor = Math.random() * total;
  for (const item of weighted) {
    cursor -= item.weight;
    if (cursor <= 0) return item.type;
  }
  return weighted[weighted.length - 1]?.type || "picture";
}
function chooseCoverageType(categories, nodeType) {
  const nodeCategory = coreCategoryForType(nodeType);
  const category = categories.includes(nodeCategory)
    ? nodeCategory
    : categories[Math.floor(Math.random() * categories.length)];
  return weightedTaskType(CORE_COVERAGE_TYPES[category], nodeType);
}
function chooseEventType(nodeType) {
  if (nodeType === "lucky" && state.quickEvents < 2) return "lucky";
  if ((nodeType === "start" || nodeType === "finish") && state.quickEvents < 2) return "quick";

  const missing = missingCoreCategories();
  const remaining = CORE_TARGET - state.coreCompleted;
  // 剩余核心任务数等于缺失类别数时，逐项保底，确保 Final 前完成六类教学活动。
  if (missing.length && remaining <= missing.length) return chooseCoverageType(missing, nodeType);

  let available;
  if (state.coreCompleted < 4) available = ["picture", "charade", "dialogue"];
  else if (state.coreCompleted < 7) available = ["picture", "charade", "dialogue", "memory", "agent", "diagnosis", "timed"];
  else available = [...CORE_TASK_TYPES];

  // 后半程优先补齐尚未出现的活动，但仍保留随机选择和落点影响。
  if (state.coreCompleted >= 6 && missing.length && Math.random() < 0.72) {
    return chooseCoverageType(missing, nodeType);
  }
  return weightedTaskType(available, nodeType);
}
function challengerCategoryForType(type) {
  if (type === "picture") return "weather";
  if (type === "charade") return "activity";
  if (["agent", "diagnosis"].includes(type)) return "correction";
  return "";
}
function enableChallengerForTask(task) {
  const category = challengerCategoryForType(task.type);
  if (!category || state.challengerOfferCategories.includes(category)) return false;
  state.challengerOfferCategories.push(category);
  return true;
}
function makeLuckyTask() {
  const effects = [
    { key: "forward", icon: "🍁", result: "全队前进 1 格！", detail: "一片秋叶带你们向前。" },
    { key: "hint", icon: "💡", result: "获得一次免费提示！", detail: "下次请求提示时可以使用。" },
    { key: "reroll", icon: "🎲", result: "再掷一次！", detail: "完成这个事件后，本队继续。" },
  ];
  const effect = effects[Math.floor(Math.random() * effects.length)]; const team = currentTeam();
  if (effect.key === "forward") team.position = Math.min(pathNodes.length - 1, team.position + 1);
  if (effect.key === "hint") team.freeHints += 1;
  if (effect.key === "reroll") state.keepTurn = true;
  return { type: "lucky", resultIcon: effect.icon, result: effect.result, detail: effect.detail, prompt: "幸运事件！", completed: true };
}
function makeQuickTask() {
  const lines = ["春天、夏天、秋天、冬天！", "天气怎么样？", "我最喜欢秋天！"];
  const line = lines[(state.round + state.currentTeam) % lines.length];
  return { type: "quick", resultIcon: "📣", result: "全班一起说！", detail: line, reference: line, prompt: "快闪任务", completed: true };
}

async function rollDice() {
  if (state.phase !== "ready" || state.finalUnlocked) return;
  state.phase = "rolling"; setAgent(`${currentTeam().team}，骰子转起来！`, "rolling"); render();
  const dice = document.querySelector("#dice-value");
  const diceStatus = document.querySelector("#dice-status");
  const result = Math.floor(Math.random() * 6) + 1;
  for (let tick = 0; tick < 5; tick += 1) {
    if (dice) dice.textContent = String(Math.floor(Math.random() * 6) + 1);
    await wait(82);
  }
  state.die = result; state.phase = "moving";
  if (dice) {
    dice.textContent = String(result);
    dice.setAttribute("aria-label", `骰子点数 ${result}`);
    dice.classList.remove("is-rolling");
    dice.classList.add("is-settled");
  }
  if (diceStatus) diceStatus.textContent = `掷到 ${result}，棋子出发！`;
  setAgent(`${currentTeam().team}掷到了${result}！出发！`, "moving"); announce(`${currentTeam().team}掷到${result}`);
  await wait(180);
  dice?.classList.remove("is-settled");
  await moveCurrentTeam(result); openLandingEvent();
}
async function moveCurrentTeam(steps) {
  const team = currentTeam();
  for (let step = 0; step < steps; step += 1) {
    const previousPosition = team.position;
    if (team.position < pathNodes.length - 1) team.position += 1;
    else team.position = Math.max(8, pathNodes.length - 1 - (steps - step - 1));
    syncBoardStep(previousPosition, team.position, step === steps - 1);
    await wait(step === steps - 1 ? 260 : 210);
  }
}
function syncBoardStep(previousPosition, nextPosition, isLastStep) {
  const previousNode = stage.querySelector(`[data-node-index="${previousPosition}"]`);
  const nextNode = stage.querySelector(`[data-node-index="${nextPosition}"]`);
  const pawn = stage.querySelector(`[data-pawn-team="${state.currentTeam}"]`);
  previousNode?.classList.remove("has-current");
  previousNode?.classList.add("is-traversed");
  window.setTimeout(() => previousNode?.classList.remove("is-traversed"), 220);
  if (nextNode && pawn) {
    nextNode.querySelector(".pawn-stack")?.append(pawn);
    pawn.classList.remove("is-stepping");
    void pawn.offsetWidth;
    pawn.classList.add("is-stepping");
    window.setTimeout(() => pawn.classList.remove("is-stepping"), 190);
  }
  nextNode?.classList.add("has-current");
  if (isLastStep) {
    nextNode?.classList.add("is-arriving");
    window.setTimeout(() => nextNode?.classList.remove("is-arriving"), 240);
  }
  const positionLabel = stage.querySelector(`[data-team-index="${state.currentTeam}"] [data-team-position]`);
  if (positionLabel) positionLabel.textContent = `第 ${nextPosition} 格`;
}
function openLandingEvent() {
  const team = currentTeam(); const node = pathNodes[team.position]; const type = chooseEventType(node.type);
  state.voice = { context: "", status: "", transcript: "" };
  challengerRunId += 1;
  state.challenger.current = null;
  state.challenger.rolling = false;
  if (type === "lucky") state.task = makeLuckyTask();
  else if (type === "quick") state.task = makeQuickTask();
  else {
    state.task = chooseTask(type);
    state.task.challengerEnabled = enableChallengerForTask(state.task);
    state.seenTypes[type] += 1;
  }
  if (type === "lucky" || type === "quick") state.quickEvents += 1;
  state.phase = "task";
  const meta = taskMeta[type];
  const challengerNote = state.task.challengerEnabled ? " 这题可以点击“随机挑战者”，邀请一位同学。" : "";
  setAgent(type === "lucky" ? `${team.team}遇到了幸运事件！` : `${team.team}，请完成${meta.label}。${challengerNote}`, type === "lucky" ? "lucky" : "thinking"); render();
}

async function drawRandomChallenger() {
  const challenger = state.challenger;
  if (challenger.rolling || !state.task?.challengerEnabled) return;
  challenger.rolling = true;
  const runId = ++challengerRunId;
  const panel = stage.querySelector(".challenger-control");
  const button = panel?.querySelector('[data-action="draw-challenger"]');
  const label = panel?.querySelector("strong");
  panel?.classList.add("is-rolling");
  if (button) { button.disabled = true; button.textContent = "抽取中…"; }
  for (let tick = 0; tick < 11; tick += 1) {
    if (runId !== challengerRunId || !stage.contains(panel)) {
      challenger.rolling = false;
      const freshButton = stage.querySelector('.challenger-control [data-action="draw-challenger"]');
      if (freshButton) { freshButton.disabled = false; freshButton.textContent = challenger.current ? "换一位" : "开始抽取"; }
      return;
    }
    const preview = STUDENT_IDS[Math.floor(Math.random() * STUDENT_IDS.length)];
    if (label) label.textContent = `正在抽取：${preview}号……`;
    await wait(85);
  }
  const selected = takeNextStudent();
  challenger.rolling = false;
  panel?.classList.remove("is-rolling");
  panel?.classList.add("has-student", "just-selected");
  window.setTimeout(() => panel?.classList.remove("just-selected"), 260);
  if (label) label.innerHTML = `请 <b class="challenger-number">${selected}</b> 号同学完成挑战`;
  const note = panel?.querySelector("small"); if (note) note.textContent = challengerInstruction(state.task.type);
  if (button) { button.disabled = false; button.textContent = "换一位"; button.className = "button button-quiet button-large"; }
  setAgent(`请${selected}号同学完成挑战！`, "thinking");
  announce(`请${selected}号同学完成挑战`);
}

function takeNextStudent(excluded = []) {
  const challenger = state.challenger; const blocked = new Set(excluded);
  let choices = challenger.remaining.filter((id) => !blocked.has(id));
  if (!choices.length) {
    challenger.remaining = STUDENT_IDS.filter((id) => !blocked.has(id));
    choices = [...challenger.remaining];
  }
  const lastStudent = challenger.recent[challenger.recent.length - 1];
  if (choices.length > 1) choices = choices.filter((id) => id !== lastStudent);
  const selected = choices[Math.floor(Math.random() * choices.length)];
  challenger.remaining.splice(challenger.remaining.indexOf(selected), 1);
  challenger.drawn.push(selected);
  challenger.recent = [...challenger.recent, selected].slice(-5);
  challenger.current = selected;
  return selected;
}

function selectMemoryCard(kind, key) {
  const task = state.task;
  if (!task || task.type !== "memory" || task.completed || task.matchedKeys.includes(key)) return;
  if (kind === "season") task.selectedSeason = key;
  if (kind === "activity") task.selectedActivity = key;
  task.wrongPair = null; task.lastMatch = null;
  if (!task.selectedSeason || !task.selectedActivity) {
    task.feedback = "再选一张卡完成一组。";
    render(); return;
  }
  if (task.selectedSeason === task.selectedActivity) {
    const pair = memoryPairs.find((item) => item.key === task.selectedSeason);
    task.matchedKeys.push(pair.key);
    task.lastMatch = pair;
    task.feedback = `${pair.season} → ${pair.activity} ✓`;
    task.selectedSeason = ""; task.selectedActivity = "";
    setAgent(`${pair.season}可以${pair.activity}。配对正确！`, "success");
  } else {
    task.wrongPair = { season: task.selectedSeason, activity: task.selectedActivity };
    task.feedback = "再想一想，可以重新选择一张卡。";
    setAgent("这两张还没有配对。再想一想！", "hint");
  }
  render();
}

async function drawChangeStudent() {
  const task = state.task; const challenger = state.challenger;
  if (!task || task.type !== "change" || task.roundPhase !== "draw" || challenger.rolling) return;
  challenger.rolling = true; const runId = ++challengerRunId;
  const panel = stage.querySelector(".change-student-picker");
  const label = panel?.querySelector("strong"); const button = panel?.querySelector("button");
  if (button) { button.disabled = true; button.textContent = "抽取中…"; }
  for (let tick = 0; tick < 11; tick += 1) {
    if (runId !== challengerRunId || state.task !== task || !stage.contains(panel)) { challenger.rolling = false; return; }
    const preview = STUDENT_IDS[Math.floor(Math.random() * STUDENT_IDS.length)];
    if (label) label.textContent = `正在抽取：${preview}号……`;
    await wait(85);
  }
  const selected = takeNextStudent(task.usedStudents);
  task.usedStudents.push(selected); task.currentStudent = selected; task.roundPhase = "answer";
  task.hintShown = false; task.referenceVisible = false; task.roundFeedback = "";
  challenger.rolling = false;
  const data = currentTaskData(task);
  setAgent(`第${task.roundIndex + 1}轮，请${selected}号同学回答：${data.prompt}`, "thinking");
  announce(`第${task.roundIndex + 1}轮，请${selected}号同学回答`); render();
}

function retryChangeRound() {
  const task = state.task; if (!task || task.type !== "change" || task.roundPhase !== "answer") return;
  task.hintShown = true;
  setAgent(`再想一想。关键词：${currentTaskData(task).keywords}`, "hint"); render();
}
function revealChangeReference() {
  const task = state.task; if (!task || task.type !== "change" || task.roundPhase !== "answer" || task.referenceVisible) return;
  task.referenceVisible = true;
  setAgent("老师需要时可以查看参考表达；学生的合理答案也可以。", "hint"); render();
}
function completeChangeRound() {
  const task = state.task; if (!task || task.type !== "change" || task.roundPhase !== "answer") return;
  task.roundPhase = "feedback"; task.referenceVisible = true;
  setAgent(`第${task.roundIndex + 1}轮完成！${task.currentStudent}号同学说出了变化。`, "success"); render();
}
function advanceChangeRound() {
  const task = state.task; if (!task || task.type !== "change" || task.roundPhase !== "feedback" || task.roundIndex >= 3) return;
  task.roundIndex += 1; task.roundPhase = "draw"; task.currentStudent = "";
  task.hintShown = false; task.referenceVisible = false; task.roundFeedback = "";
  state.challenger.current = null;
  setAgent(`第${task.roundIndex + 1}轮，点击“抽取学生”。`, "thinking"); render();
}
function finishChangeChallenge() {
  const task = state.task; if (!task || task.type !== "change" || task.roundPhase !== "feedback" || task.roundIndex !== 3) return;
  markCoreTaskComplete(task.rounds.map((round) => round.reference).join("　"));
}

function requestTaskHint() {
  const task = state.task; const data = currentTaskData(task); if (!data.hints?.length) return;
  if (currentTeam().freeHints > 0) currentTeam().freeHints -= 1;
  task.hintLevel = Math.min(data.hints.length, task.hintLevel + 1); setAgent(data.hints[task.hintLevel - 1], "hint"); render();
}
function startChallengeTimer() {
  const task = state.task;
  if (!task || task.type !== "timed" || task.timerStarted) return;
  task.timerStarted = true; task.timeLeft = task.data.seconds; setAgent("快速挑战开始！大家一起想，一起说！", "timer"); render();
  window.clearInterval(challengeTimer);
  challengeTimer = window.setInterval(() => {
    if (!state.task || state.task !== task || task.completed) { window.clearInterval(challengeTimer); return; }
    task.timeLeft -= 1;
    if (task.timeLeft <= 0) {
      task.timeLeft = 0; task.timerDone = true; window.clearInterval(challengeTimer);
      setAgent("时间到！没有关系，说完就可以。", "hint");
    }
    syncChallengeTimer(task);
  }, 1000);
}
function syncChallengeTimer(task) {
  const timedPlay = stage.querySelector(".timed-play"); if (!timedPlay || state.task !== task) return;
  timedPlay.classList.toggle("is-running", task.timerStarted && !task.timerDone);
  const face = timedPlay.querySelector(".timer-face");
  if (face) { face.textContent = task.timerDone ? "✓" : String(task.timeLeft); face.setAttribute("aria-label", `快速挑战计时，${task.timerDone ? "时间到" : `${task.timeLeft}秒`}`); }
  const status = timedPlay.querySelector("div:nth-child(2) strong");
  if (status) status.textContent = task.timerDone ? "时间到，也可以继续说！" : `${task.timeLeft} 秒`;
  timedPlay.querySelector(".timer-track span")?.style.setProperty("--time-progress", `${Math.max(0, task.timeLeft / task.data.seconds) * 100}%`);
}
function markCoreTaskComplete(reference) {
  const task = state.task; if (!task || task.completed) return;
  const data = currentTaskData(task);
  window.clearInterval(challengeTimer);
  task.completed = true; task.reference = reference || data.reference; task.feedback = "完成！先听听 Agent 的参考表达。";
  const coverageCategory = coreCategoryForType(task.type);
  if (coverageCategory) state.coreCoverage[coverageCategory] = true;
  state.recentCoreTypes = [...state.recentCoreTypes, task.type].slice(-3);
  state.coreCompleted = Math.min(CORE_TARGET, state.coreCompleted + 1);
  if (state.coreCompleted >= CORE_TARGET) state.finalUnlocked = true;
  let message = "说得好！这是一个参考表达。"; let status = "success";
  if (task.type === "agent") { message = "谢谢你们！我说得更好了。"; status = "corrected"; }
  if (task.type === "diagnosis") { message = `对！可以这样说：${task.reference}`; status = "corrected"; }
  if (task.type === "timed" && task.reference.includes("了")) message = `对！${task.reference} “了”表示现在和以前不一样。`;
  if (task.type === "change" && task.rounds) message = "四轮变化挑战完成！大家会用“了”说不同的变化了。";
  if (task.type === "charade") message = "三轮完成！大家猜了词、季节，还说了完整句。";
  if (task.type === "memory") message = "配对成功，完整句也说出来了！";
  setAgent(message, status);
  const speechText = task.type === "charade" ? task.roundReferences[task.roundReferences.length - 1] : task.type === "change" && task.rounds ? message : task.reference;
  speak(speechText); render();
}
function completeCharadeRound() {
  const task = state.task; if (!task || task.type !== "charade" || task.completed || !task.wordRevealed) return;
  const data = currentTaskData(task); task.roundReferences.push(data.reference);
  if (task.charadeRound < task.data.rounds.length - 1) {
    task.charadeRound += 1; task.wordRevealed = false; task.hintLevel = 0;
    setAgent(`对！${data.reference} 下一轮！`, "success"); render(); return;
  }
  markCoreTaskComplete(task.roundReferences.join("　"));
}
function judgeDiagnosis(choice) {
  const task = state.task; if (!task || task.type !== "diagnosis" || task.completed) return;
  task.judged = true; task.judgementCorrect = choice === task.data.verdict;
  if (task.judgementCorrect) {
    task.feedback = task.data.success;
    setAgent(`${task.data.success} 先说说为什么，再帮我修改。`, "diagnosis");
  } else {
    task.feedback = task.data.verdict === "valid"
      ? "这句话本身可以。不要因为没有“了”就把它判错。"
      : "句子或情境里还有一个地方需要调整。";
    setAgent("再看看这个地方。可以请求提示，再判断一次。", "hint");
  }
  render();
}
function handleOption(option) {
  const task = state.task; if (!task || task.completed) return;
  const data = currentTaskData(task);
  if (data.correct === "any" || option === data.correct) markCoreTaskComplete(data.reference);
  else { task.feedback = data.wrongFeedback || "再看看情境，想一想。"; task.hintLevel = Math.max(1, task.hintLevel); setAgent(task.feedback, "hint"); render(); }
}
function advanceTurn() {
  window.clearInterval(challengeTimer);
  challengerRunId += 1;
  if (!state.keepTurn) {
    state.currentTeam = (state.currentTeam + 1) % state.teams.length;
    if (state.currentTeam === 0) state.round += 1;
  }
  state.keepTurn = false; state.phase = "ready"; state.die = null; state.task = null; state.voice = { context: "", status: "", transcript: "" };
  setAgent(`${currentTeam().team}，轮到你们了！`, "thinking"); render();
}
function continueAfterTask() {
  const task = state.task; if (!task || (!task.completed && !["lucky", "quick"].includes(task.type))) return;
  if (state.finalUnlocked) { state.task = null; state.phase = "ready"; setAgent(`${CORE_TARGET}次核心互动完成！全班最终挑战已经解锁。`, "success"); render(); return; }
  advanceTurn();
}

function startFinal() {
  state.final = {
    active: true,
    phase: "board",
    teamIndex: 0,
    selectedCategory: "",
    difficulty: 0,
    challenge: null,
    hint: 0,
    feedback: "",
    completed: false,
  };
  state.phase = "final";
  state.voice = { context: "", status: "", transcript: "" };
  setAgent("综合挑战开始！春队先选择类别和难度。", "thinking");
  render();
}
function selectFinalChallenge(categoryKey, difficulty) {
  const category = finalChallengeCategories.find((item) => item.key === categoryKey);
  const level = Math.min(3, Math.max(1, Number(difficulty)));
  if (!category || !finalChallengeBank[categoryKey]?.[level - 1]) return;
  state.final.selectedCategory = categoryKey;
  state.final.difficulty = level;
  state.final.challenge = finalChallengeBank[categoryKey][level - 1];
  state.final.hint = 0;
  state.final.feedback = "";
  state.final.phase = "challenge";
  const team = state.teams[state.final.teamIndex];
  setAgent(`${team.team}选择了${category.label}${level}星。请听题！`, categoryKey === "error" ? "diagnosis" : "thinking");
  speak(state.final.challenge.prompt);
  render();
}
function markFinalCorrect() {
  if (state.final.phase !== "challenge") return;
  state.final.phase = "feedback";
  setAgent("回答正确！这是一个参考表达。", "success");
  speak(state.final.challenge.reference);
  render();
}
function advanceFinalTeam() {
  if (state.final.phase !== "feedback") return;
  if (state.final.teamIndex >= state.teams.length - 1) { completeFinal(); return; }
  state.final.teamIndex += 1;
  state.final.phase = "board";
  state.final.selectedCategory = "";
  state.final.difficulty = 0;
  state.final.challenge = null;
  state.final.hint = 0;
  state.final.feedback = "";
  const team = state.teams[state.final.teamIndex];
  setAgent(`${team.team}，请选择类别和难度。`, "thinking");
  render();
}
function completeFinal() {
  state.final.completed = true;
  state.final.active = false;
  state.phase = "finished";
  const summary = "太棒了！你们已经会说季节、天气、活动和天气的变化了！";
  setAgent(summary, "success");
  speak(summary);
  render();
}

function startRecognition(context) {
  if (!Recognition) { state.voice = { context, transcript: "", status: "这个浏览器不能用语音识别。直接说完后，点击“已完成”就可以。" }; setAgent("我听不到也没关系，大家直接说！", "hint"); render(); return; }
  if (recognition) recognition.abort(); recognition = new Recognition(); recognition.lang = "zh-CN"; recognition.interimResults = false; recognition.maxAlternatives = 1;
  state.voice = { context, transcript: "", status: "请说……" }; setAgent("我在听，请说！", "listening"); render();
  recognition.onresult = (event) => { state.voice = { context, transcript: event.results[0][0].transcript, status: "" }; setAgent("我听到了！老师和全班来判断。", "listening"); render(); };
  recognition.onerror = () => { state.voice = { context, transcript: "", status: "没有听清。直接说完后，点击“已完成”就可以。" }; render(); };
  recognition.onend = () => { recognition = null; };
  try { recognition.start(); } catch { state.voice = { context, transcript: "", status: "语音没有开始。直接口头回答就可以。" }; render(); }
}

function resetGame() {
  window.clearInterval(challengeTimer); challengerRunId += 1; recognition?.abort(); window.speechSynthesis?.cancel();
  const fresh = initialState(); fresh.mode = "game"; state = fresh;
  setAgent("四支队伍准备好了吗？春队先来！", "thinking"); render();
}

stage.addEventListener("click", (event) => {
  const button = event.target.closest("button"); if (!button) return;
  if (button.matches(".js-speak")) { speak(button.dataset.speak || ""); return; }
  const action = button.dataset.action;
  if (action === "open-mode") { switchMode(button.dataset.mode); return; }
  if (action === "go-home") { switchMode("home"); return; }
  if (action === "quick-category") { chooseNextQuickQuestion(button.dataset.category); setAgent("换一类题。学生先口头回答。", "thinking"); render(); return; }
  if (action === "quick-next") { chooseNextQuickQuestion(); setAgent("下一题，请听题。", "thinking"); render(); return; }
  if (action === "quick-hint") { const question = state.quickTool.question; state.quickTool.hint = Math.min(question.hints.length, state.quickTool.hint + 1); setAgent(question.hints[state.quickTool.hint - 1], "hint"); render(); return; }
  if (action === "quick-complete") { state.quickTool.answered = true; setAgent("回答完成！这是一个参考表达。", "success"); speak(state.quickTool.question.reference); render(); return; }
  if (action === "roll") { rollDice(); return; }
  if (action === "draw-challenger") { drawRandomChallenger(); return; }
  if (action === "memory-season") { selectMemoryCard("season", button.dataset.key); return; }
  if (action === "memory-activity") { selectMemoryCard("activity", button.dataset.key); return; }
  if (action === "memory-complete") { if (state.task?.matchedKeys.length === memoryPairs.length) markCoreTaskComplete(memoryPairs.map((pair) => pair.sentence).join("　")); return; }
  if (action === "change-draw-student") { drawChangeStudent(); return; }
  if (action === "change-retry") { retryChangeRound(); return; }
  if (action === "change-reference") { revealChangeReference(); return; }
  if (action === "change-correct") { completeChangeRound(); return; }
  if (action === "change-next-round") { advanceChangeRound(); return; }
  if (action === "change-finish") { finishChangeChallenge(); return; }
  if (action === "voice") { startRecognition(button.dataset.context); return; }
  if (action === "reveal-word") { state.task.wordRevealed = true; setAgent("表演者看到了。请用动作表演，其他同学先猜词和季节，再说完整句！", "thinking"); render(); return; }
  if (action === "charade-round-complete") { completeCharadeRound(); return; }
  if (action === "start-timer") { startChallengeTimer(); return; }
  if (action === "task-hint") requestTaskHint();
  if (action === "task-option") handleOption(button.dataset.option);
  if (action === "task-complete") markCoreTaskComplete();
  if (action === "agent-okay") { state.task.feedback = "这句话本身可以。这里强调以前和现在不一样，还能说得更好。"; state.task.hintLevel = Math.max(1, state.task.hintLevel); setAgent("句子没有错。再想一想：怎样说出变化？", "hint"); render(); }
  if (action === "agent-improve") { state.task.challengeAccepted = true; setAgent("谁来帮助我说得更好？", "corrected"); render(); }
  if (action === "diagnosis-choice") { judgeDiagnosis(button.dataset.choice); return; }
  if (action === "diagnosis-retry") { state.task.judged = false; state.task.judgementCorrect = false; state.task.feedback = ""; setAgent("再判断一次：句子本身可以，还是有问题？", "diagnosis"); render(); return; }
  if (action === "diagnosis-resolve") { markCoreTaskComplete(state.task.data.reference); return; }
  if (action === "task-continue") continueAfterTask();
  if (action === "vote-add") { const key = button.dataset.season; state.vote.votes[key] += 1; state.vote.history.push(key); clearVoteResult(); updateVoteOption(key); syncVoteControls(); announce(`${seasons.find((season) => season.key === key).name}，${state.vote.votes[key]}票`); return; }
  if (action === "vote-undo" && state.vote.history.length) { const key = state.vote.history.pop(); state.vote.votes[key] = Math.max(0, state.vote.votes[key] - 1); clearVoteResult(); updateVoteOption(key); syncVoteControls(); return; }
  if (action === "vote-reset") { state.vote.votes = { spring: 0, summer: 0, autumn: 0, winter: 0 }; state.vote.history = []; clearVoteResult(); seasons.forEach((season) => updateVoteOption(season.key)); syncVoteControls(); return; }
  if (action === "vote-reveal") { state.vote.revealed = true; setAgent(voteSummaryText(), "success"); showVoteResult(); return; }
  if (action === "final-select") { selectFinalChallenge(button.dataset.category, Number(button.dataset.difficulty)); return; }
  if (action === "final-hint") { const hints = state.final.challenge?.hints || []; if (!hints.length) return; state.final.hint = Math.min(hints.length, state.final.hint + 1); setAgent(hints[state.final.hint - 1], "hint"); render(); return; }
  if (action === "final-retry") { state.final.feedback = "请小组再讨论一次。"; setAgent("再想一想，不着急。", "hint"); render(); return; }
  if (action === "final-back-board") { state.final.phase = "board"; state.final.challenge = null; state.final.hint = 0; state.final.feedback = ""; setAgent(`${state.teams[state.final.teamIndex].team}，重新选择一个挑战。`, "thinking"); render(); return; }
  if (action === "final-correct") { markFinalCorrect(); return; }
  if (action === "final-next-team") { advanceFinalTeam(); return; }
  if (action === "restart") resetGame();
});

agentSpeaker.addEventListener("click", () => speak(agentSpeaker.dataset.speak || agentMessage.textContent));
finalButton.addEventListener("click", startFinal);
restartButton.addEventListener("click", () => { if (window.confirm("重新开始这次四季冒险吗？")) resetGame(); });
backToConsoleButton.addEventListener("click", () => switchMode("home"));

createVoiceSettings();
setAgent("老师，请选择今天需要的课堂工具。", "thinking");
render();
