"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';

const domande = [
  "Mi sento triste o giù di morale, anche senza una ragione chiara o specifica.",
  "Ho perso interesse o piacere per attività che prima mi davano soddisfazione.",
  "Faccio fatica ad alzarmi dal letto o a iniziare attività quotidiane per mancanza di energia o senso di vuoto emotivo.",
  "Mi sento spesso senza speranza, pessimista o convinto(a) che la mia vita non abbia senso.",
  "Il mio appetito e/o il ritmo del mio sonno sono cambiati significativamente (in aumento o in diminuzione) senza motivo apparente.",
  "Ultimamente ho avuto pensieri sulla morte, sul suicidio o sulla voglia di sparire per mettere fine al mio dolore emotivo.", // FLAG
  "Ho difficoltà a mantenere l'attenzione o la concentrazione, mi sento spesso distratto(a) o distante.",
  "I miei rapporti con gli altri sono diventati difficili o faticosi, e mi sto isolando sempre di più.",
  "Piango spesso o sento un'intensa voglia di piangere senza una ragione particolare.",
  "Provo una persistente sensazione di colpa o inutilità, sentendo di deludere le persone intorno a me."
];

export default function TestDepressione() {
  const [risposte, setRisposte] = useState(Array(10).fill(0));
  const [risultato, setRisultato] = useState(null);
  const [indiceAttuale, setIndiceAttuale] = useState(0);

  const registraRisposta = (valore) => {
    const nuoveRisposte = [...risposte];
    nuoveRisposte[indiceAttuale] = valore;
    setRisposte(nuoveRisposte);

    if (indiceAttuale < domande.length - 1) {
      setIndiceAttuale(indiceAttuale + 1);
    } else {
      calcolaRisultato(nuoveRisposte);
    }
  };

  const calcolaRisultato = (risposte) => {
    if (risposte[5] >= 3) { // FLAG
      setRisultato("ROSSO");
    } else {
      const somma = risposte.reduce((a, b) => a + b, 0);
      if (somma <= 20) setRisultato("VERDE");
      else if (somma <= 35) setRisultato("GIALLO");
      else setRisultato("ROSSO");
    }
  };

  const riavviaTest = () => {
    setRisposte(Array(10).fill(0));
    setRisultato(null);
    setIndiceAttuale(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!risultato ? (
        <>
          <h2 className="text-xl font-semibold mb-4">{`Test della Depressione`}</h2>
          <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-4">
              Indica con quale frequenza ciascuna situazione ti accade attualmente:<br />
              <strong>(1) Mai | (2) Raramente | (3) A volte | (4) Frequentemente | (5) Sempre</strong>
            </p>
          </div>

          <p className="mb-4">{domande[indiceAttuale]}</p>

          <div className="flex justify-between items-end mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const gradiente = {
                1: "from-gray-300 to-gray-400",
                2: "from-blue-200 to-blue-300",
                3: "from-blue-300 to-blue-400",
                4: "from-blue-500 to-blue-600",
                5: "from-blue-700 to-blue-800",
              };

              return (
                <button
                  key={num}
                  onClick={() => registraRisposta(num)}
                  className={`flex items-center justify-center rounded-full text-white font-bold hover:scale-110 transition transform bg-gradient-to-br ${gradiente[num]}`}
                  style={{
                    width: `${30 + num * 5}px`,
                    height: `${30 + num * 5}px`,
                    fontSize: `${12 + num}px`
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm">Domanda {indiceAttuale + 1} di {domande.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">Risultato: {risultato}</h2>
          <img
            src={
              risultato === "VERDE"
                ? "/images/semaforo-verde.png"
                : risultato === "GIALLO"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`Semaforo: ${risultato}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {risultato === "VERDE" && (
            <p className="text-center">Gestisci molto bene questo aspetto e sei emotivamente equilibrato(a). Potrai essere di grande aiuto ad altre persone che necessitano sostegno.</p>
          )}
          {risultato === "GIALLO" && (
            <p className="text-center">Ci sono chiari segnali di difficoltà emotive che richiedono attenzione e che, con determinazione e aiuto, possono essere superati.</p>
          )}
          {risultato === "ROSSO" && (
            <p className="text-center">I tuoi problemi emotivi legati a questo tema richiedono necessariamente l'intervento di un professionista. Ti consigliamo di cercare rapidamente l'aiuto di un medico o psicologo.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={riavviaTest}
          >
            Ripeti il test
          </button>
    
        </>
      )}
    </div>
  );
}