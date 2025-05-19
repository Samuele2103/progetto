export default function TerminiDiServizio() {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Termini di Servizio</h1>
          <p className="text-sm text-gray-500 mb-10">Ultimo aggiornamento: <span className="italic">[9/05/25]</span></p>
  
          {[
            {
              title: '1. Oggetto',
              content:
                'Gamestore è un e-commerce che vende videogiochi. L’uso del sito implica l’accettazione dei presenti termini.',
            },
            {
              title: '2. Account utente',
              content:
                'L’utente è responsabile della sicurezza e dell’uso del proprio account e delle credenziali.',
            },
            {
              title: '3. Prezzi',
              content:
                'Tutti i prezzi sono espressi in Euro e comprensivi di IVA. La disponibilità dei prodotti è soggetta a variazioni.',
            },
            {
              title: '4. Pagamenti',
              content:
                'Accettiamo pagamenti tramite carta di credito, PayPal e altri metodi sicuri indicati nel checkout.',
            },
            {
              title: '5. Spedizioni',
              content:
                'Le spedizioni vengono effettuate entro 24/48h lavorative. I tempi di consegna dipendono dalla destinazione.',
            },
            {
              title: '6. Recesso',
              content:
                'Hai diritto di recesso entro 14 giorni dalla ricezione, ai sensi del Codice del Consumo (D.Lgs. 206/2005).',
            },
            {
              title: '7. Proprietà intellettuale',
              content:
                'Tutti i contenuti presenti sul sito sono protetti da copyright e non possono essere riprodotti senza autorizzazione.',
            },
            {
              title: '8. Limitazioni',
              content:
                'Gamestore non è responsabile per danni derivanti da uso improprio del sito o da interruzioni del servizio.',
            },
            {
              title: '9. Modifiche',
              content:
                'Ci riserviamo il diritto di modificare i presenti termini in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina.',
            },
            {
              title: '10. Legge applicabile',
              content:
                'I presenti termini sono regolati dalla legge italiana. Il foro competente è quello di [sede legale].',
            },
          ].map(({ title, content }, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h2>
              <p className="text-gray-600 leading-relaxed">{content}</p>
            </div>
          ))}
        </section>
      </main>
    );
  }