import { deletePreviousDayData } from '../src/utils/supabaseFunctions';

console.log('バッチ処理を開始します。');

deletePreviousDayData()
  .then((data) => {
    console.log(`${data}件のデータを削除します。`);
    console.log('バッチ処理が正常に実行されました。');
  })
  .catch((error) => {
    console.error('データの削除に失敗しました。');
    console.error(`エラー内容: ${error.message}`);
  })
  .finally(() => {
    console.log('バッチ処理を終了します。');
  });
