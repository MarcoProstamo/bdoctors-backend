# Guida all'Uso del Controller dei Medici

Questo documento descrive come utilizzare il modulo `doctorsController`, responsabile della gestione delle operazioni relative ai dati dei medici in un'applicazione. Include le rotte disponibili, le validazioni e i possibili messaggi di errore per garantire il corretto funzionamento.

---

## Metodo Index

**Scopo**: Recupera tutti i medici dal database.

- **Rotta**: `GET /doctors`
- **Descrizione**: Restituisce un elenco di medici con i campi principali: `id`, `name`, `surname` e `medical_specialization`.
- **Risposta**:
  - **Successo**: Restituisce un array di record dei medici.
  - **Errore**: Restituisce uno stato 500 con un messaggio di errore generico se si verifica un problema del server.

---

## Metodo Show

**Scopo**: Recupera i dettagli di un medico specifico e le sue recensioni associate.

- **Rotta**: `GET /doctors/:id`
- **Parametri**:
  - `id` (obbligatorio): ID del medico.
- **Descrizione**: Restituisce informazioni dettagliate su un medico specifico, incluse le recensioni relative.
- **Risposta**:
  - **Successo**: Restituisce un oggetto JSON con i dettagli del medico e le sue recensioni.
  - **Errori**:
    - **400**: Parametro non valido.
    - **404**: Medico o recensioni non trovati.
    - **500**: Errore SQL o problema interno del server.

---

## Metodo Store

**Scopo**: Aggiunge un nuovo medico al database.

- **Rotta**: `POST /doctors`
- **Parametri del corpo**:
  - `name` (obbligatorio): Nome del medico.
  - `surname` (obbligatorio): Cognome del medico.
  - `email` (obbligatorio): Indirizzo email del medico.
  - `cellphone_number` (obbligatorio): Numero di cellulare del medico.
  - `address` (obbligatorio): Indirizzo del medico.
  - `medical_specialization` (obbligatorio): Specializzazione del medico.
- **Validazioni**:
  - I campi non possono essere vuoti.
  - `name` e `surname` devono avere almeno 3 caratteri.
  - `address` deve avere almeno 5 caratteri.
  - L'email deve essere valida e unica (non già presente nel database).
  - Il numero di cellulare deve essere valido (formato standard internazionale).
- **Risposta**:
  - **Successo**: Stato 201 con un messaggio di conferma e i dettagli del medico creato.
  - **Errori**:
    - **400**: Errori di validazione dell'input.
    - **500**: Problema del server o errore SQL.

---

## Metodo Update

**Scopo**: Aggiorna le informazioni di un medico esistente.

- **Rotta**: `PUT /doctors/:id`
- **Parametri**:
  - `id` (obbligatorio): ID del medico.
- **Parametri del corpo**: Gli stessi del metodo `store`.
- **Validazioni**: Gli stessi del metodo `store`.
- **Risposta**:
  - **Successo**: Stato 200 con un messaggio di conferma e i dettagli aggiornati.
  - **Errori**:
    - **400**: Errori di validazione dell'input.
    - **404**: Medico non trovato.
    - **500**: Problema del server o errore SQL.

---

## Metodo Modify

**Scopo**: Aggiorna parzialmente le informazioni di un medico.

- **Rotta**: `PATCH /doctors/:id`
- **Parametri**:
  - `id` (obbligatorio): ID del medico.
- **Parametri del corpo**:
  - Accetta un qualsiasi sottoinsieme dei campi utilizzati nel metodo `store`.
- **Risposta**:
  - **Successo**: Stato 200 con un messaggio di conferma e i dettagli aggiornati.
  - **Errori**:
    - **400**: Errori di validazione dell'input.
    - **404**: Medico non trovato.
    - **500**: Problema del server o errore SQL.

---

## Metodo Destroy

**Scopo**: Elimina un medico dal database.

- **Rotta**: `DELETE /doctors/:id`
- **Parametri**:
  - `id` (obbligatorio): ID del medico.
- **Risposta**:
  - **Successo**: Stato 200 con un messaggio di conferma.
  - **Errori**:
    - **404**: Medico non trovato.
    - **500**: Problema del server o errore SQL.

---

## Best Practices

1. **Validazione lato client**: Assicurati che i dati inviati alle API siano già conformi alle regole di validazione.
2. **Gestione degli errori**: Implementa un sistema di gestione degli errori lato client per gestire i vari stati di risposta.
3. **Sicurezza**: Proteggi le rotte tramite autenticazione e autorizzazione, soprattutto per le operazioni di scrittura, modifica ed eliminazione.
4. **Logging**: Mantieni un registro delle operazioni effettuate per scopi diagnostici e di auditing.

---

## Note Finali

Questa guida descrive le funzionalità principali del modulo `doctorsController`. Per personalizzazioni o funzionalità aggiuntive, è possibile espandere le logiche del controller in modo modulare.
