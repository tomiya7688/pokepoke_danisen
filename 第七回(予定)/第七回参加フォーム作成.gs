/**
 * 第7回ポケポケ段位戦 参加表明フォーム（準備用）を作成する。
 *
 * 第6回のGoogleフォーム回答シートで確認できた設問3個を引き継ぐ。
 * 第7回は開催時期・リーグ分け・段位認定が未確定なので、作成時は非公開にする。
 * スクリプトを再実行してもフォームを重複作成しない。
 */
function createSeventhDanisenForm() {
  const props = PropertiesService.getScriptProperties();
  const key = 'POKEPOKE_DANISEN_7_FORM_ID';
  const existingId = props.getProperty(key);

  if (existingId) {
    const existingForm = FormApp.openById(existingId);
    Logger.log('第7回フォームは既に作成済みです。編集用: ' + existingForm.getEditUrl());
    Logger.log('回答シートID: ' + props.getProperty('POKEPOKE_DANISEN_7_RESPONSE_SHEET_ID'));
    return;
  }

  // 第7回の正式な開催・日程はまだ未決定。公開前の下書きを作成する。
  const form = FormApp.create('第7回ポケポケ段位戦 参加表明（準備中）', false);
  form.setDescription(
    '第7回ポケポケ段位戦の参加表明フォーム（準備中）です。\n' +
    '開催日程、リーグ分け、段位の扱いは正式決定後に案内します。\n' +
    '第6回の登録名とオープンチャット名を参考に照合します。\n' +
    '運営が公開を決定するまでは回答を受け付けません。'
  );
  form.setCollectEmail(false);
  form.setConfirmationMessage('回答ありがとうございました。正式な案内はオープンチャット等でお知らせします。');

  form.addTextItem()
    .setTitle('段位戦に登録するあなたの名前')
    .setHelpText('参加者リストに掲載する名前を入力してください。')
    .setRequired(true);

  form.addTextItem()
    .setTitle('オープンチャットでの名前')
    .setHelpText('運営が本人を確認できる名前を入力してください。')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('参加しますか?')
    .setChoiceValues(['はい', 'いいえ'])
    .setRequired(true);

  // 第6回回答シートには上記3設問が確認されている。
  // 過去の回答は混ぜず、第7回専用の新規回答シートを用意する。
  const sheet = SpreadsheetApp.create('第7回段位戦参加表明（回答・準備中）');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  props.setProperty(key, form.getId());
  props.setProperty('POKEPOKE_DANISEN_7_RESPONSE_SHEET_ID', sheet.getId());

  Logger.log('第7回フォーム作成完了（非公開）。');
  Logger.log('編集用URL: ' + form.getEditUrl());
  Logger.log('回答用URL（公開後に使用）: ' + form.getPublishedUrl());
  Logger.log('回答シートURL: ' + sheet.getUrl());
}
