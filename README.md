# 翻訳こんにゃく

# 環境
- Mac
- chrome
- node v9.10.1

# setup
- `git clone git@github.com:fmstiara/HonyakuKonnyaku.git`
- `npm install`
- [Microsoft Translator テキスト API で、日本語を英語に翻訳するサンプル](https://qiita.com/TakeshiNickOsanai/items/a8039ba8d558f7c8a05e)に従い、TranslateAPIのkeyを取得
- プロジェクトのルートに`.env`ファイルを作成して、TRANLATE_TEXT_KEYに取得したキーを設定。
- `node app.js`で実行!

# routing
- '/': 翻訳こんにゃく
- '/recognition': SpeechRecognitionサンプル
- '/synthesis': SpeechSynthesisサンプル