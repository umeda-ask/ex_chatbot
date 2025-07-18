'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    // CSSの動的読み込み
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://umeda-ask.github.io/ex_chatbot/styles.css';
    document.head.appendChild(link);

    // HTML構造の動的生成
    const chatbotHTML = `
    <div id="chatbot">
        <div id="chatbotHeader">
            <img src="https://umeda-ask.github.io/ex_chatbot/person_icon.png" alt="Person Icon" id="personIcon">
            <span>お問い合わせチャット</span>
            <span id="closeChatbot" style="cursor: pointer;">✖</span>
        </div>
        <div id="chatbotMessages">
            <ul id="chatbot-ul"></ul>
        </div>
        <div id="chatbotPhone">
            <span id="phoneText">ご相談はこちらから: </span>
            <a href="tel:05031885207" id="phoneLink">050-XXXX-XXX</a>
        </div>
        <div id="chatbotInput">
            <input type="text" id="messageInput" placeholder="メッセージを入力...">
            <button id="sendMessage">送信</button>
        </div>
    </div>
    <button id="openChatbot">
        <img src="https://umeda-ask.github.io/ex_chatbot/chat_open.png" alt="チャットアイコン">
        <span id="openChatbotTooltip">お問い合わせはこちらから</span>
    </button>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // EmailJSのスクリプト動的読み込み
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.onload = () => {
        emailjs.init("hugWN77kXtanuGGDO");
    };
    document.head.appendChild(script);

    // チャットリスト直接埋め込み
    const chatList = {
        "intro": {
          "text": "●●行政書士事務所のホームページにようこそ！こちらのチャットをご利用いただきますと、お客様のお問い合わせ内容を簡単にまとめることができます。"
        },
        "q1": {
          "title": "次の項目から、お客様のご相談内容を選んでください。",
          "choices": [
            "相続や贈与、後見に関すること",
            "役所への許認可などの申請、書類提出に関すること",
            "契約書や内容証明、法務書類の作成に関すること",
            "起業や法人設立に関すること",
            "●●行政書士事務所に関すること",
            "お客様のご相談内容が、上記のどれに当てはまるかわからない"
          ],
          "next":[
            "q2",
            "q7",
            "q18",
            "q23",
            "q27",
            "q29",
          ]
        },
        "q2": {
          "title": "ご相談内容はどんなことですか？",
          "choices": [
            "遺言書について",
            "相続について",
            "遺産分割協議書について",
            "贈与について",
            "一つ前の質問に戻る"
          ],
          "next":[
            "q3",
            "q4",
            "q5",
            "q6"
          ]
        },
        "q3": {
          "title": "遺言書についてのご相談内容はどんなことですか？",
          "choices": [
            "どの遺言の方式が良いか知りたい",
            "具体的な書き方を知りたい",
            "遺言執行者を決める必要があるか知りたい",
            "遺言書を作成するときに注意した方がいいことを知りたい",
            "遺言書について、第三者（専門家）の意見を知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q3_detail": {
          "title": "遺言書に記載する内容について決めていることをどのようなことですか？",
          "choices": [
            "相続したい人や財産の分配について決めている",
            "特定の人や団体に多く渡したい",
            "家族へのメッセージなども書きたい",
            "遺言の方式はすでに決めている",
            "何を記載したらいいのかわからないが、遺言書をつくりたい",
            "一つ前の質問に戻る"
          ]
        },
        "q4": {
          "title": "相続についてのご相談内容はどんなことですか？",
          "choices": [
            "相続人の範囲や相続分の計算方法について知りたい",
            "相続放棄の手続きや期限について知りたい",
            "相続手続きの流れについて知りたい",
            "相続税の申告について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q4_detail": {
          "title": "相続の内容について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "相続人の範囲がわかっている（必要な戸籍謄本が揃っている）",
            "相続の対象となっている財産がわかっている",
            "相続人と相続分の計算が決まっている",
            "相続を放棄することを決めている",
            "一つ前の質問に戻る"
          ]
        },
        "q5": {
          "title": "遺産分割協議書についてのご相談内容はどんなことですか？",
          "choices": [
            "遺産分割協議書をつくる必要があるか知りたい",
            "遺産分割協議書の作り方（書き方）を知りたい",
            "遺産の範囲（何が相続財産か）を知りたい",
            "遺産分割協議書に署名押印する人は誰か（相続人）を知りたい",
            "遺産分割方法について、第三者（専門家）の意見を知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q5_detail": {
          "title": "遺産分割の内容について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "相続人の範囲がわかっている（必要な戸籍謄本が揃っている）",
            "相続の対象となっている財産がわかっている",
            "相続人と相続分の計算が決まっている",
            "相続を放棄することを決めている",
            "遺言書はあるが、遺言書のとおりにしないことを決めている",
            "一つ前の質問に戻る"
          ]
        },
        "q6": {
          "title": "贈与についてのご相談内容はどんなことですか？",
          "choices": [
            "贈与契約書をつくる必要があるか知りたい",
            "贈与契約書の作り方（書き方）を知りたい",
            "贈与に関する手続きについて知りたい",
            "贈与税がかかるかどうかについて知りたい",
            "贈与について、第三者（専門家）の意見を知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q6_detail": {
          "title": "贈与の内容について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "贈与する人を決めている",
            "贈与する内容（財産）を決めている",
            "贈与契約書の書き方は知っている（書いたことがある）",
            "生前贈与をしたいが、税金等で損をしそうで困っている",
            "贈与をしたいが、全く進められないので困っている",
            "一つ前の質問に戻る"
          ]
        },
        "q7": {
          "title": "ご相談内容はどんなことですか？",
          "choices": [
            "外国人の在留資格申請について",
            "自動車の登録について",
            "建設業関係の営業について",
            "産業廃棄物関係の営業について",
            "飲食業関係の営業について",
            "風俗営業について",
            "宗教法人について",
            "福祉事業について",
            "古物商について",
            "その他の許認可が必要な営業について",
            "一つ前の質問に戻る"
          ],
          "next":[
            "q8",
            "q9",
            "q10",
            "q11",
            "q12",
            "q13",
            "q14",
            "q15",
            "q16",
            "q17"
          ]
        },
        "q8": {
          "title": "外国人の在留資格申請についてのご相談内容はどんなことですか？",
          "choices": [
            "どんな在留資格に該当するか知りたい",
            "必要な書類が何か知りたい",
            "申請手続きの流れやスケジュールを知りたい",
            "申請に必要な資格や要件について知りたい",
            "申請前の準備について知りたい",
            "延長や変更などの手続きについて知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q8_detail": {
          "title": "外国人の在留資格申請について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "申請したい在留資格について決めている",
            "就業先や留学先について決めている",
            "日本で活動したい内容について決めている",
            "日本での居所（住所）について決めている",
            "現在所持しているビザの残りの有効期間が3か月を切っている",
            "日本に在留したいという意向は決めているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q9": {
          "title": "自動車登録についてのご相談内容はどんなことですか？",
          "choices": [
            "どんな手続きに該当するか知りたい",
            "必要な書類が何か知りたい",
            "申請手続きの流れやスケジュールを知りたい",
            "申請に必要な要件について知りたい",
            "申請前の準備について知りたい",
            "手数料について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q9_detail": {
          "title": "自動車登録について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "登録をする手続きの種類について決まっている",
            "登録をする車両について決まっている",
            "登録をする場所について決まっている",
            "登録をする名義について決まっている",
            "現在の車検の有効期間が残り3か月を切っている",
            "自動車登録の手続きをすること自体は決めているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q10": {
          "title": "建設業関係営業についてのご相談内容はどんなことですか？",
          "choices": [
            "どんな許可に該当するか知りたい",
            "必要な書類が何か知りたい",
            "申請手続きの流れやスケジュールを知りたい",
            "営業開始前の準備について知りたい",
            "営業可能な場所かどうか知りたい",
            "必要な設備や車両等について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q10_detail": {
          "title": "建設業関係営業について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "許可をとりたい業種について決めている",
            "営業する拠点について決めている",
            "導入する設備や車両、配置が必要な資格者が決まっている",
            "営業するエリアについて決めている",
            "事業規模について決めている（法人、個人事業主）",
            "営業すること自体は決めているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q11": {
          "title": "産業廃棄物関係営業についてのご相談内容はどんなことですか？",
          "choices": [
            "どんな許可に該当するか知りたい",
            "必要な書類が何か知りたい",
            "申請手続きの流れやスケジュールを知りたい",
            "営業開始前の準備について知りたい",
            "営業可能な場所かどうか知りたい",
            "必要な設備や車両等について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q11_detail": {
          "title": "産業廃棄物関係営業について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "許可をとりたい業種について決めている",
            "営業する拠点について決めている",
            "導入する設備や車両、配置が必要な資格者が決まっている",
            "営業するエリアについて決めている",
            "事業規模について決めている（法人、個人事業主）",
            "営業すること自体は決めているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q12": {
          "title": "飲食業関係の営業について",
          "choices": [
            "どんな許可に該当するか知りたい",
            "必要な書類が何か知りたい",
            "申請手続きの流れやスケジュールを知りたい",
            "営業開始前の準備について知りたい",
            "営業可能な場所かどうか知りたい",
            "必要な設備や車両等について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q12_detail": {
          "title": "飲食業関係営業について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "許可をとりたい業種について決めている",
            "営業する拠点について決めている",
            "導入する設備や配置が必要な資格者が決まっている",
            "営業するエリアについて決めている",
            "事業規模について決めている（法人、個人事業主）",
            "営業すること自体は決めているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q13": {
          "title": "風俗営業についてのご相談内容はどんなことですか？",
          "choices": [
            "どの営業に該当するか知りたい",
            "必要な書類が何か知りたい",
            "申請手続きの流れを知りたい",
            "営業開始前の準備について知りたい",
            "営業可能な場所かどうか知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q13_detail": {
          "title": "風俗営業について決めていることをどのようなことですか？",
          "choices": [
            "出店する場所について決めている",
            "出店する営業の形態について決めている",
            "出店する店舗の内装について決めている",
            "出店する時期について決めている",
            "出店すること自体は決めているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q14": {
          "title": "宗教法人について",
          "choices": [
            "どの営業に該当するか知りたい",
            "必要な書類が何か知りたい",
            "申請手続きの流れを知りたい",
            "営業開始前の準備について知りたい",
            "営業可能な場所かどうか知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q14_detail": {
          "title": "宗教法人について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "設立する拠点について決めている",
            "設立する組織形態（役員等）について決めている",
            "拠点となる土地建物がある",
            "宗教法人になろうとする団体がある",
            "儀式行事や布教活動を行っている",
            "設立すること自体は決めているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q15": {
          "title": "福祉事業について？",
          "choices": [
            "どんな許認可に該当するか知りたい",
            "必要な書類が何か知りたい",
            "申請手続きの流れやスケジュールを知りたい",
            "事業開始前の準備について知りたい",
            "福祉事業が可能な場所かどうか知りたい",
            "福祉事業の税務や法的義務について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q15_detail": {
          "title": "飲食業関係営業について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "設立する拠点について決めている",
            "設立する組織形態（役員等）について決めている",
            "福祉事業の拠点となる土地建物がある",
            "福祉事業の種類を決めている",
            "福祉事業の提供サービスを決めている",
            "福祉事業をすること自体は決めているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q16": {
          "title": "古物商についてのご相談内容はどんなことですか？",
          "choices": [
            "どんな許認可に該当するか知りたい",
            "必要な書類が何か知りたい",
            "申請手続きの流れやスケジュールを知りたい",
            "営業前の準備について知りたい",
            "古物商の営業が可能な場所かどうか知りたい",
            "古物商の法的義務について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q16_detail": {
          "title": "古物商について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "営業する拠点について決めている",
            "営業する組織形態（役員等）について決めている",
            "事業の拠点となる土地建物がある",
            "営業する業種を決めている（店頭、インターネット）",
            "取り扱う商品を決めている",
            "古物商をすること自体は決めているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q17": {
          "title": "その他の許認可営業についてのご相談内容はどんなことですか？",
          "choices": [
            "どんな許可に該当するか知りたい",
            "必要な書類が何か知りたい",
            "申請手続きの流れやスケジュールを知りたい",
            "営業開始前の準備について知りたい",
            "営業可能な場所かどうか知りたい",
            "必要な設備や車両等について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q17_detail": {
          "title": "その他の許認可営業について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "許可をとりたい業種について決めている",
            "営業する拠点について決めている",
            "導入する設備や配置が必要な資格者が決まっている",
            "営業するエリアについて決めている",
            "事業規模について決めている（法人、個人事業主）",
            "営業すること自体は決めているが、その他は検討中である",
            "一つ前の質問に戻る"
          
          ]
        },
        "q18": {
          "title": "ご相談内容はどんなことですか？",
          "choices": [
            "契約書について",
            "内容証明について",
            "離婚協議書について",
            "その他の法務書類について",
            "一つ前の質問に戻る"
          ],
          "next":[
            "q19",
            "q20",
            "q21",
            "q22",
          ]
          
        },
        "q19": {
          "title": "契約書についてのご相談内容はどんなことですか？",
          "choices": [
            "どんな契約書に該当するか知りたい",
            "どんなことを記載すればよいか知りたい",
            "契約書作成を依頼する場合の流れやスケジュールを知りたい",
            "契約書のチェックを依頼する場合の流れやスケジュールを知りたい",
            "法的リスクについて知りたい",
            "トラブルになる事例について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q19_detail": {
          "title": "契約書について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "契約の当事者について決まっている",
            "契約の概要について決まっている",
            "契約書に記載したい内容について決まっている",
            "契約時期について決まっている",
            "自分で作成した草案がある",
            "契約の必要性はわかっているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q20": {
          "title": "内容証明についてのご相談内容はどんなことですか？",
          "choices": [
            "内容証明を作成すべきかどうか知りたい",
            "どんなことを記載すればよいか知りたい",
            "内容証明を作成依頼する場合の流れやスケジュールを知りたい",
            "内容証明のチェックを依頼する場合の流れやスケジュールを知りたい",
            "法的リスクについて知りたい",
            "トラブルになる事例について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q20_detail": {
          "title": "内容証明について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "内容証明を出す相手方について決まっている",
            "内容証明の概要について決まっている",
            "内容証明に記載したい内容について決まっている",
            "内容証明を出したい時期について決まっている",
            "自分で作成した草案がある",
            "内容証明の必要性はわかっているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q21": {
          "title": "離婚協議書についてのご相談内容はどんなことですか？",
          "choices": [
            "離婚協議書を作成すべきかどうか知りたい",
            "どんなことを記載すればよいか知りたい",
            "離婚協議書を作成依頼する場合の流れやスケジュールを知りたい",
            "離婚協議書のチェックを依頼する場合の流れやスケジュールを知りたい",
            "法的リスクについて知りたい",
            "トラブルになる事例について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q21_detail": {
          "title": "離婚協議書について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "離婚協議書を出す相手方について決まっている",
            "離婚協議書の概要について決まっている",
            "離婚協議書に記載したい内容について決まっている",
            "離婚協議を完了したい時期について決まっている",
            "自分で作成した草案がある",
            "離婚協議書の必要性はわかっているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q22": {
          "title": "その他の法務書類についてのご相談内容はどんなことですか？",
          "choices": [
            "法務書類を作成すべきかどうか知りたい",
            "どんなことを記載すればよいか知りたい",
            "法務書類を作成依頼する場合の流れやスケジュールを知りたい",
            "法務書類のチェックを依頼する場合の流れやスケジュールを知りたい",
            "法的リスクについて知りたい",
            "トラブルになる事例について知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q22_detail": {
          "title": "その他の法務書類について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "法務書類を出す相手方について決まっている",
            "法務書類の概要について決まっている",
            "法務書類に記載したい内容について決まっている",
            "法務書類を出したい時期について決まっている",
            "自分で作成した草案がある",
            "法務書類の必要性はわかっているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q23": {
          "title": "ご相談内容はどんなことですか？",
          "choices": [
            "創業・起業について",
            "個人事業主について",
            "法人設立について",
            "一つ前の質問に戻る"
          ],
          "next":[
            "q24",
            "q25",
            "q26"
          ]
        },
        "q24": {
          "title": "創業・起業についてのご相談内容はどんなことですか？",
          "choices": [
            "創業時にどんな手続きが必要か知りたい",
            "創業時の融資や補助金の制度について知りたい",
            "雇用のやり方や留意点について知りたい",
            "会計（経理・税務など）のやり方や留意点について知りたい",
            "法的リスクについて知りたい",
            "ビジネスプランやマーケティングについて知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q24_detail": {
          "title": "創業・起業について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "販売する商品・サービスについて決まっている",
            "利用したい融資や補助金制度について決まっている",
            "雇用について決まっている",
            "会計のやり方について決まっている",
            "自分で作成した創業計画書がある",
            "創業・起業したいと思っているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q25": {
          "title": "個人事業主についてのご相談内容はどんなことですか？",
          "choices": [
            "創業時にどんな手続きが必要か知りたい",
            "創業時の融資や補助金の制度について知りたい",
            "雇用のやり方や留意点について知りたい",
            "会計（経理・税務など）のやり方や留意点について知りたい",
            "法的リスクについて知りたい",
            "ビジネスプランやマーケティングについて知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q25_detail": {
          "title": "個人事業主について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "販売する商品・サービスについて決まっている",
            "利用したい融資や補助金制度について決まっている",
            "雇用について決まっている",
            "会計のやり方について決まっている",
            "自分で作成した創業計画書がある",
            "個人事業主として事業をやりたいと思っているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q26": {
          "title": "法人設立についてのご相談内容はどんなことですか？",
          "choices": [
            "法人を設立するためにどんな手続きが必要か知りたい",
            "法人向けの融資や補助金の制度について知りたい",
            "法人の雇用のやり方や留意点について知りたい",
            "法人の会計（経理・税務など）のやり方や留意点について知りたい",
            "法人の法的リスクについて知りたい",
            "法人のビジネスプランやマーケティングについて知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q26_detail": {
          "title": "法人設立について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "販売する商品・サービスについて決まっている",
            "利用したい融資や補助金制度について決まっている",
            "雇用について決まっている",
            "会計のやり方について決まっている",
            "自分で作成した創業計画書がある",
            "法人を設立して事業をやりたいと思っているが、その他は検討中である",
            "一つ前の質問に戻る"
          ]
        },
        "q27": {
          "title": "ご相談内容はどんなことですか？",
          "choices": [
            "●●行政書士事務所について",
            "一つ前の質問に戻る"
          ],
          "next": [
            "q28"
          ]
        },
        "q28": {
          "title": "●●行政書士事務所についてのご相談内容はどんなことですか？",
          "choices": [
            "どんなことを依頼できるのか知りたい",
            "自分のケースは●●行政書士事務所に依頼できるのか知りたい",
            "依頼費用の相場観について知りたい",
            "具体的な依頼費用の見積もってもらいたい",
            "依頼した場合のスケジュールについて知りたい",
            "弁護士や司法書士など、他の士業との違いについて知りたい",
            "一つ前の質問に戻る"
          ]
        },
        "q28_detail": {
          "title": "●●行政書士事務所について決まっていることや決まっていないことはどのようなことですか？",
          "choices": [
            "依頼したいことについて決まっている",
            "依頼費用の予算について決まっている",
            "依頼する内容のスケジュールについて決まっている",
            "自分で途中までやってみたが、うまくいかなくて困っている",
            "他の士業に相談したが、セカンドオピニオンを聞いてみたいと思っている",
            "士業に依頼した方が良さそうだが、どんなふうに相談したらよいのかわからない",
            "一つ前の質問に戻る"
          ]
        },
        "q29": {
        "title": "お客様のご相談したい内容内容をメッセージ入力欄に記載して送信ボタンを押してください。",
        "choices": ["一つ前の質問に戻る"]
      },
        "q30": {
          "title": "その他に決まっている（決めている）ことやわからないことがありましたら、その内容をメッセージ入力欄に記載して送信ボタンを押してください。\n特に追加のメッセージがない場合は、「追加メッセージなし」のボタンを押してください",
          "choices": ["追加メッセージなし", "一つ前の質問に戻る"]
        },
        "q31": {
          "title": "次にお客様のお名前、連絡先などについて、メッセージ入力欄に記載して送信ボタンを押してください。",
          "choices": ["一つ前の質問に戻る"]
        },
        "q32": {
          "title": "お客様のお名前をメッセージ入力欄に記載して送信ボタンを押してください。",
          "choices": ["一つ前の質問に戻る"]
        },
        "q33": {
          "title": "当事務所とのご相談方法の希望について教えてください。（初回の相談は●分まで無料でご相談できます。）",
          "choices": [
            "電話",
            "メール",
            "オンラインミーティング",
            "対面ミーティング",
            "一つ前の質問に戻る"
          ]
        },
        "q34": {
          "title": "お客様の電話番号をメッセージ入力欄に記載して送信ボタンを押してください。",
          "choices": ["一つ前の質問に戻る"]
        },
        "q35": {
          "title": "お客様のメールアドレスをメッセージ入力欄に記載して送信ボタンを押してください。",
          "choices": [ "一つ前の質問に戻る"]
        },
        "q36": {
          "title": "当事務所とのご相談内容とお客様のお名前、当事務所との相談方法、ご相談者様の連絡先については、いかのとおりですね？\nよろしければ「はい」ボタンを、違っていれば「1つ戻る」ボタンで該当の質問項目まで戻って、正しい内容を選択・記入してください。",
          "choices": ["はい", "一つ前の質問に戻る"]
        },
        "q37": {
          "title": "当事務所にて、入力内容をお預かりします。\n後ほど具体的なご相談の日程調整について、メールやお電話でご連絡しますので、少々お待ちください。\nこのたびは、お問い合わせいただき、ありがとうございました。",
          "choices": []
        }
    };
    const chatKeys = Object.keys(chatList);

    let userCount = 0;
    let userData = [];
    let robotCount = 0;
    let userName = '';
    let userAddress = '';
    let userPhone = '';
    let userInquiry = '';
    let historyStack = [];

    const openChatbotButton = document.getElementById('openChatbot');
    const closeChatbotButton = document.getElementById('closeChatbot');
    const sendMessageButton = document.getElementById('sendMessage');

    openChatbotButton.onclick = function() {
        const chatbot = document.getElementById('chatbot');
        chatbot.style.display = 'flex';
        setTimeout(() => {
            chatbot.classList.add('show');
        }, 10);
        setTimeout(() => {
            openChatbotButton.classList.add('hide');
        }, 200);
    };

    closeChatbotButton.onclick = function() {
        const chatbot = document.getElementById('chatbot');
        chatbot.classList.remove('show');
        setTimeout(() => {
            chatbot.style.display = 'none';
            openChatbotButton.classList.remove('hide');
        }, 200);
    };

    sendMessageButton.onclick = function() {
        const message = document.getElementById('messageInput').value;
        if (message.trim() !== '') {
            const messageElem = document.createElement('li');
            messageElem.classList.add('right');
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chatbot-right');
            messageDiv.textContent = message;
            messageElem.appendChild(messageDiv);
            document.getElementById('chatbot-ul').appendChild(messageElem);
            document.getElementById('messageInput').value = '';

            userCount++;
            userData.push(message);

            if (robotCount === 8) userName = message;
            else if (robotCount === 9) userAddress = message;
            else if (robotCount === 10) userPhone = message;
            else if (robotCount === 11) userInquiry = message;

            const currentKey = chatKeys[robotCount];

            if (["q29", "q30", "q31", "q32", "q34", "q35"].includes(currentKey)) {
                historyStack.push(robotCount);
                robotCount++;
            } else {
                robotCount++;
            }
            robotOutput();

            setTimeout(() => {
                sendMessageButton.disabled = false;
            }, 2100);

            // DOM追加処理がすべて終わったあとに
            setTimeout(() => {
                scrollChatToBottom(); // 遅延スクロール
            }, 100);
        }
    };

    function scrollChatToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageItems = messagesContainer.querySelectorAll('#chatbot-ul li');

        if (messageItems.length === 0) return;

        // 最後の左側メッセージ（ロボット発言）を探す（逆から検索）
        let targetMessage = null;
        for (let i = messageItems.length - 1; i >= 0; i--) {
            if (messageItems[i].querySelector('.chatbot-left')) {
                targetMessage = messageItems[i];
                break;
            }
        }

        if (!targetMessage) return;

        // スクロール実行
        targetMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // 吹き出しの上端をチャット画面の上に合わせる
        });
    }

function robotOutput() {
    if (robotCount >= chatKeys.length) return;

    const key = chatKeys[robotCount];
    const current = chatList[key];
    if (!current) return;

    const ul = document.getElementById('chatbot-ul');
    const li = document.createElement('li');
    li.classList.add('left');
    ul.appendChild(li);

    const robotLoadingDiv = document.createElement('div');
    robotLoadingDiv.classList.add('chatbot-left');
    robotLoadingDiv.innerHTML = '<div class="loading"><span></span><span></span><span></span></div>';
    li.appendChild(robotLoadingDiv);
    // DOM追加処理がすべて終わったあとに
    setTimeout(() => {
        scrollChatToBottom(); // 遅延スクロール
    }, 100);

    setTimeout(() => {
        robotLoadingDiv.remove();
        const div = document.createElement('div');
        div.classList.add('chatbot-left');
        li.appendChild(div);

        // --- ✅ q36は特別処理 ---
        if (key === 'q36') {
            div.innerHTML = `
                ${current.title.replace(/\n/g, '<br>')}
                <br><br>
                <strong>これまでの入力内容：</strong><br>
                ${userData.map((msg, i) => `${i + 1}. ${msg}`).join('<br>')}
            `;

            const choiceField = document.createElement('div');
            choiceField.id = `q-${robotCount}`;
            div.appendChild(choiceField);

            current.choices.forEach((choice, i) => {
                const choiceButton = document.createElement('button');
                choiceButton.id = `q-${robotCount}-${i}`;
                choiceButton.setAttribute('onclick', 'pushChoice(this)');
                choiceButton.classList.add('choice-button');
                choiceButton.textContent = choice;
                choiceField.appendChild(choiceButton);
            });

            sendMessageButton.disabled = true; // ボタン選択方式にするため
            return;
        }

        // --- 通常処理 ---
        if (current.choices && current.choices.length > 0) {
            const choiceField = document.createElement('div');
            choiceField.id = `q-${robotCount}`;
            div.appendChild(choiceField);

            const choiceTitle = document.createElement('div');
            choiceTitle.classList.add('choice-title');
            choiceTitle.textContent = current.title;
            choiceField.appendChild(choiceTitle);

            current.choices.forEach((choice, i) => {
                const choiceButton = document.createElement('button');
                choiceButton.id = `q-${robotCount}-${i}`;
                choiceButton.setAttribute('onclick', 'pushChoice(this)');
                choiceButton.classList.add('choice-button');
                choiceButton.textContent = choice;
                choiceField.appendChild(choiceButton);
            });

            // ボタン選択のときは送信ボタンを無効化
            if (!["q29", "q30", "q31", "q32", "q34", "q35"].includes(key)) {
                sendMessageButton.disabled = true;
            } else {
                sendMessageButton.disabled = false;
            }

        } else {
            div.textContent = current.title || current.text;
            sendMessageButton.disabled = false;

            if (!["q29", "q30", "q31", "q32", "q34", "q35"].includes(key)) {
                robotCount++;

                // q37なら送信処理して終了
                if (key === 'q37') {
                    const current_time = new Date().toLocaleString();
                    const messageHistory = userData.map((v, i) => `${i + 1}. ${v}`).join('\n');

                    emailjs.send("askchatmail", "template_ufwmbjq", {
                        current_time: current_time,
                        selectedChoices: userData.join('\n'),
                        message: messageHistory
                    }).then(function(response) {
                        console.log("Email sent:", response.status, response.text);
                    }, function(error) {
                        console.error("Email send failed:", error);
                    });

                    return; // 二重送信防止
                }

                robotOutput();
            }
        }

        // DOM追加処理がすべて終わったあとに
        setTimeout(() => {
            scrollChatToBottom(); // 遅延スクロール
        }, 100);

    }, 2000);
}


    window.pushChoice = function(e) {
        if (e.textContent === '一つ前の質問に戻る') {
            if (historyStack.length > 0) {
                robotCount = historyStack.pop();
                if (userData.length > 0) {
                    userData.pop();  // 戻るときに回答を1つ削除
                    userCount--;     // カウントも戻す（任意）
                }
                robotOutput();
            }
            return;
        }

        historyStack.push(robotCount);
        const choicedId = e.getAttribute('id');
        const choiceIndex = parseInt(choicedId.split('-')[2]);
        userCount++;
        userData.push(e.textContent);

        const currentKey = chatKeys[robotCount];
        const current = chatList[currentKey];

        for (let i = 0; i < current.choices.length; i++) {
            const btn = document.getElementById(`q-${robotCount}-${i}`);
            btn.disabled = true;
            btn.classList.add('choice-button-disabled');
        }
        e.classList.remove('choice-button-disabled');

        // let nextKey = '';
        // if (currentKey === 'q1') {
        //     switch (choiceIndex) {
        //         case 0: nextKey = 'q2'; break;
        //         case 1: nextKey = 'q7'; break;
        //         case 2: nextKey = 'q18'; break;
        //         case 3: nextKey = 'q23'; break;
        //         case 4: nextKey = 'q27'; break;
        //         case 5: nextKey = 'q29'; break;
        //         default: nextKey = 'q29';
        //     }
        // } else if (currentKey === 'q2') {
        //     switch (choiceIndex) {
        //         case 0: nextKey = 'q3'; break;
        //         case 1: nextKey = 'q4'; break;
        //         case 2: nextKey = 'q5'; break;
        //         case 3: nextKey = 'q6'; break;
        //         default: nextKey = 'q30';
        //     }
        // } else if (/^q\d+$/.test(currentKey) && chatKeys.includes(`${currentKey}_detail`)) {
        //     nextKey = `${currentKey}_detail`;
        // } else if (currentKey.endsWith('_detail')) {
        //     nextKey = 'q30';
        // } else {
        //     const currentIndex = chatKeys.indexOf(currentKey);
        //     nextKey = chatKeys[currentIndex + 1];
        // }
      let nextKey = '';
      if (current.next && current.next.length > choiceIndex) {
          nextKey = current.next[choiceIndex];
      } else if (/^q\d+$/.test(currentKey) && chatKeys.includes(`${currentKey}_detail`)) {
          nextKey = `${currentKey}_detail`;
      } else if (currentKey.endsWith('_detail')) {
          nextKey = 'q30';
      } else {
          const currentIndex = chatKeys.indexOf(currentKey);
          nextKey = chatKeys[currentIndex + 1];
      }
        const nextIndex = chatKeys.indexOf(nextKey);
        if (nextIndex !== -1) {
            robotCount = nextIndex;
            robotOutput();
        }
    };

    robotOutput();
});
