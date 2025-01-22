# Guida all'Uso del Controller dei Medici

Questo documento spiega come utilizzare il modulo `doctorsController`, che gestisce le operazioni relative ai dati dei medici in un'applicazione, utilizza le rotte e le validazioni appropriate per garantire il corretto funzionamento.

---

## Metodo Index

**Scopo**: Recupera tutti i medici dal database.

- **Rotta**: `GET /doctors`
- **Descrizione**: Recupera un elenco di medici con i campi `id`, `name`, `surname` e `medical_specialization`.
- **Risposta**:
  - Success: Restituisce un array di record di medici.
  - Error: Restituisce uno stato 500 con un messaggio di Error.

---

## Metodo Show

**Scopo**: Recupera i dettagli di un medico specifico e le sue recensioni.

- **Rotta**: `GET /doctors/:id`
- **Parametri**:
  - `id` (obbligatorio): ID del medico.
- **Descrizione**: Recupera informazioni dettagliate su un medico e le sue recensioni associate.
- **Risposta**:
  - Success: Restituisce un oggetto con le sue recensioni.
  - Error:
    - 400: Parametro non valido.
    - 404: Medico o recensioni non trovati.
    - 500: Error SQL.

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
  - L'email deve essere valida e non già presente nel database.
  - Il numero di cellulare deve essere valido.
- **Risposta**:
  - Success: Restituisce uno stato 201 con un messaggio di Success.
  - Error:
    - 400: Errori di validazione dell'input.
    - 500: Error SQL.

---

## Metodo Update

**Scopo**: Aggiorna le informazioni di un medico esistente.

- **Rotta**: `PUT /doctors/:id`
- **Parametri**:
  - `id` (obbligatorio): ID del medico.
- **Parametri del corpo**: Gli stessi del metodo `store`.
- **Validazioni**: Gli stessi del metodo `store`.
- **Risposta**:
  - Success: Restituisce uno stato 200 con un messaggio di Success.
  - Error:
    - 400: Errori di validazione dell'input.
    - 500: Error SQL.

---

## Metodo Modify

**Scopo**: Aggiorna parzialmente le informazioni di un medico.

- **Rotta**: `PATCH /doctors/:id`
- **Parametri**:
  - `id` (obbligatorio): ID del medico.
- **Parametri del corpo**:
  - Accetta un qualsiasi sottoinsieme dei campi utilizzati nel metodo `store`.
- **Risposta**:
  - Success: Restituisce uno stato 200 con un messaggio di Success.
  - Error:
    - 500: Error SQL.

---

## Metodo Destroy

**Scopo**: Elimina un medico dal database.

- **Rotta**: `DELETE /doctors/:id`
- **Parametri**:
  - `id` (obbligatorio): ID del medico.
- **Risposta**:
  - Success: Restituisce uno stato 200 con un messaggio di Success.
  - Error:
    - 500: Error SQL.
