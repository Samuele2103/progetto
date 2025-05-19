export default function PrivacyPolicy() {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-10">Ultimo aggiornamento: <span className="italic">[9/05/25]</span></p>
  
          <p className="text-gray-700 mb-6 leading-relaxed">
            Noi di <strong>Gamestore</strong>, accessibile da{' '}
            <a href="https://www.gamestore.it" className="text-blue-500 underline">https://www.gamestore.it</a>, prendiamo seriamente la tua privacy. Questa informativa descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali ai sensi del Regolamento UE 2016/679 (GDPR).
          </p>
  
          {[
            {
              title: '1. Titolare del trattamento',
              content: (
                <>
                  Gamestore S.r.l. <br />
                  Email: <a href="mailto:privacy@gamestore.it" className="text-blue-500 underline">privacy@gamestore.it</a>
                </>
              ),
            },
            {
              title: '2. Dati raccolti',
              content: (
                <ul className="list-disc list-inside space-y-1">
                  <li>Dati forniti volontariamente: nome, email, indirizzo, ecc.</li>
                  <li>Dati raccolti automaticamente: IP, cookie, tipo di browser.</li>
                </ul>
              ),
            },
            {
              title: '3. Finalità del trattamento',
              content:
                'Gestione degli ordini, comunicazioni promozionali (previo consenso), e adempimenti legali e fiscali.',
            },
            {
              title: '4. Condivisione dei dati',
              content:
                'I dati possono essere condivisi con partner fidati come corrieri, piattaforme di pagamento e provider di hosting.',
            },
            {
              title: '5. Diritti dell’utente',
              content:
                'Hai diritto di accedere, rettificare o cancellare i tuoi dati, opporti al trattamento e presentare reclami al Garante.',
            },
            {
              title: '6. Cookie',
              content:
                'Usiamo cookie tecnici e di terze parti per il funzionamento del sito e l’analisi del traffico. Puoi gestire le preferenze nel banner dedicato.',
            },
            {
              title: '7. Contatti',
              content:
                'Per qualsiasi richiesta sulla privacy puoi contattarci via email all’indirizzo: privacy@gamestore.it',
            },
          ].map(({ title, content }, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h2>
              <div className="text-gray-600 leading-relaxed">{content}</div>
            </div>
          ))}
        </section>
      </main>
    );
  }
