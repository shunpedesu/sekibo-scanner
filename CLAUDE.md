# 石棒スキャナー 開発ルール

ブラウザで遊ぶPWA。単一の `index.html`（ビルドなし）＋ `sw.js`。公開は GitHub Pages（`master` を push すると反映。Actionsの障害で遅れることがある）。
本番: https://shunpedesu.github.io/sekibo-scanner/　LP: `/lp/`

## 絶対に守ること

- **公開（push）は、ユーザーが「公開して」と言ったときのみ。** 「直して」「実装して」は公開ではない。
- 既存セーブ（`sekiboCol` 図鑑、`sb*` せきぼっち、`theme` など）を初期値で上書きしない。
- `.claude/` と `mockup.html` はコミットしない。
- 公開する文章は「だけ」ではなく「のみ」（手軽さを表す「開くだけ」は可）。

## バージョンのルール（グンモンと同じ基準）

`Ver.X.Y.Z`。**上から順に見て、最初に当てはまったものを採る。**

| | 条件 |
| --- | --- |
| X | セーブ形式が変わる／既存の記録の意味が変わる |
| Y | **公開したあとに**、利用者が「できること・見られるもの」が増えた |
| Z | **公開したあとに**、利用者から見えるものが直った・変わった（増えてはいない） |
| 上げない | まだ公開していない版の作り込み／利用者から見えない内部の変更 |

迷ったら上げる。公開前の作り込みは、その版の中身（次の版ではない）。

### 上げるとき（同じ作業内で）

1. `release-notes.js` の **配列の先頭に1件足す**（version / name / date / lead / highlights）。バージョンの正本はここ。画面下の表示とアップデート案内はここから引く。`index.html` に数字を直書きしない。
2. `VERSION_HISTORY.md` の先頭に節を足す（公開日／区分／見える変更／理由／セーブへの影響／確認／コミット）。
3. `sw.js` の `CACHE` 名を上げる（`sekibo-vN`）。
4. `node check-release.cjs` を通す（Node は `D:\game\.tools\node-v24.18.0-win-x64` のポータブル版）。
5. 公開したら、`VERSION_HISTORY.md` の公開日とコミットを記入する。

`release-notes.js`（公開される）には利用者から見える変更のみ。セーブ形式やコミットの話は `VERSION_HISTORY.md` へ。

### アップデート案内

バージョンごとに一度のみ出る（キー `sekibo_release_notice_<version>_seen`）。画面下のバージョン表示をタップすると、いつでもこれまでの更新が見られる。
初めて遊ぶ人（保存データなし）には出さず、既読として記録する。

## テスト用URLパラメータ

せきぼっちの部屋は `?hour=23`（0〜24）と `?season=autumn`（spring/summer/autumn/winter）で時間と季節を強制できる。

## この環境の注意

- Node は PATH にない。`D:\game\.tools\node-v24.18.0-win-x64` を使う。
- `git` は `-c safe.directory='D:/game/sekibo-scanner'` を付ける。コミットの identity は shunpedesu / shunuehara888@gmail.com。
- プレビューは `.claude/launch.json` の `sekibo-scanner`（`dev-server.cjs`、port 5199）。
