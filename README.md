# isojs

## デバッグの仕方

```bash
# start
$ node debug dist/index.js

# break point( debbuger; )まで進む
> cont

# 対話モードに
> repl

# 抜ける

Ctrl + C


```

## 読み込まれる順

1. gulp 起動
    * index.jを読み込み

1. index.js 初期化
    * lib/index.js をロード
    * Controller.js をロード
    * hello-controller.js をロード
    * options.js をロード
    * index.js を実行
    * lib/index.js の Application class を new
        * addRouteでrouteの登録
            * Controller を new
            * Controller.index 登録
            * Controller.toString 登録
            * Application.document 登録

1. localhost:8000/hello/ をたたく

1. サーバ側の動き
    * lib/index.js addRoute内の handler
        * Controller を new
        * lib/Controller.js の Constructor 実行
    * lib/index.js addRoute内の controller.index
        * hello-controller.js HelloController の toString 実行
    * lib/Controller.js Controller の index 実行
    * hello-controller.js HelloController nunjucks render 実行
        * hello.htmlの描画
    * options.js document nunjucks render 実行
        * hello.htmlの結果をindex.htmlに描画して表示

1. htmlが読み込まれる
    * application.jsを読み込み
        * options.js application.js handler 実行

1. index.js クライアント側の動き
    * lib/index.client.js をロード
        * package.jsonで読み替えを指定している
    * Controller.js をロード
    * hello-controller.js をロード
    * options.client.js をロード
        * package.jsonで読み替えを指定している
    * index.js 実行
    * lib/index.client.js の Applicationをnew
        * Application constructor
        * Application registerRoutes
        * Application start
            * イベントの登録
1. クリック
    * lib/index.client.js Application click 発火
    * lib/index.client.js Application navigate 処理
        * Controller new
            * lib/controller.js cnstructor
        * controller.index
        * controller.render
            * lib/controller.js render
        * hello-controller.js toString
        * lib/controller.js Controller index
        * hello-controller.js nunjucks render 実行
            * hello.htmlの描画
        * lib/controller.js render toString
            * hello.htmlの結果を targetに描画



