# T44-coreos-song-link: Save, validate and remove the song link of a student

| Field | Value |
|---|---|
| Route | `/` (bottom nav tab **Coreos**, student view, card "Canción") |
| Source | `/home/claude/cuaderno-patin/index.html` (rStudent songBox, parseSong, songInfo, okUrl, actions saveSong, delSong) |
| Flow | Attach a Spotify or YouTube link to a student's choreography, and remove it |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no (**Quitar** in the Canción card removes the link immediately, no confirm, and only the link) |
| Estimated steps | 56 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous (no login, no network)
- Fresh browser profile: empty localStorage, no cookies
- Never click the **Abrir** link (it opens an external site in a new tab); only check its attributes.
- Do not click Web Share or download buttons anywhere.

## Test data
- `profeName = "QA Profe"`, `groupName = "Grupo QA"` (level Iniciación), `studentName = "Alumna QA"`
- `spotifyInput = "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC Vals de QA"`; expected chip "Spotify", name "Vals de QA", url `https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC`
- `youtubeInput = "https://youtu.be/dQw4w9WgXcQ"`; expected chip "YouTube", name "Canción" (no name given)
- `nameFirstInput = "Himno QA https://youtu.be/dQw4w9WgXcQ"`; expected chip "YouTube", name "Himno QA"
- `ytMusicInput = "https://music.youtube.com/watch?v=dQw4w9WgXcQ Tema QA"`; expected chip "YouTube Music", name "Tema QA"
- `plainLinkInput = "https://example.test/cancion Tema web"`; expected chip "Link", name "Tema web"
- `trailingDotInput = "https://youtu.be/dQw4w9WgXcQ."`; expected url without the final dot, expected name "."
- `longNameInput = "https://youtu.be/dQw4w9WgXcQ " + 90 × "n"`; expected name of 80 characters
- `markupInput = "https://youtu.be/dQw4w9WgXcQ <i>x</i>"`; expected name shown literally
- Invalid: `emptyInput = ""`, `spacesInput = "   "`, `noLink = "hola"`, `noScheme = "www.youtube.com/watch?v=dQw4w9WgXcQ"`, `ftpLink = "ftp://example.test/x"`, `onlyScheme = "https://"`

## Steps

### TC-00: Setup (fresh profile)
1. Open a new browser profile. Navigate to `http://localhost:8080/`.
2. Assert: heading "Bienvenida" is visible with input `#pname` and button **Empezar**.
3. Type `QA Profe` into `#pname`. Click **Empezar**. Assert: subtitle reads "Profe QA Profe · Liga".
4. Click bottom nav **Alumnas**. Assert: card "Nuevo grupo" is visible.
5. Type `Grupo QA` into `#gname`. Click **Guardar grupo**. Assert: group card "Grupo QA" is visible.
6. Type `Alumna QA` into `#newstu`. Click **Agregar**. Assert: heading "Alumnas (1)" and row "Alumna QA".
7. Click bottom nav **Coreos**. Click the card "Alumna QA". Assert: heading "Alumna QA" and button **← Alumnas del grupo**.

### TC-01: Happy path: save a Spotify link with a name
1. Assert: card "Canción" contains label "Canción (Spotify o YouTube)", `#songin` (placeholder "Pegá el link, y si querés el nombre al lado") and button **Guardar canción**; `#sgerr` is empty.
2. Type `spotifyInput` into `#songin`. Click **Guardar canción**.
3. Assert: the input and the button are replaced by a row with chip "Spotify" (menta), bold text "Vals de QA", a link **Abrir** and a button **Quitar**.
4. Assert: the **Abrir** link has `href="https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC"`, `target="_blank"` and `rel="noopener noreferrer"`. Do not click it.
5. Assert: `#songin` no longer exists on the page and no error text is shown.
6. Reload the page. Click **Coreos**, open "Alumna QA". Assert: the Canción card still shows chip "Spotify", name "Vals de QA" and the same **Abrir** href.

### TC-02: Remove the song
1. In the Canción card click **Quitar** (one click, no confirmation).
2. Assert: the row is replaced by `#songin` (empty) and **Guardar canción**; chip "Spotify" and text "Vals de QA" are gone.
3. Assert: the step cards and the checklist were not affected (no change in the counters).
4. Reload the page, open Coreos and "Alumna QA". Assert: the Canción card still shows the empty `#songin`.

### TC-03: Form validation: song link (`#songin`)
For each row type the value into `#songin`, click **Guardar canción** and assert the result. After each error assert `#sgerr` reads exactly "Pegá un link que empiece con https://" and that `#songin` is still shown (nothing saved).

| Input | Expected |
|---|---|
| `emptyInput` | error "Pegá un link que empiece con https://" |
| `spacesInput` | error "Pegá un link que empiece con https://" |
| `noLink` ("hola") | error "Pegá un link que empiece con https://" |
| `noScheme` | error "Pegá un link que empiece con https://" |
| `ftpLink` | error "Pegá un link que empiece con https://" |
| `onlyScheme` ("https://") | error "Pegá un link que empiece con https://" |
| `youtubeInput` | saved: chip "YouTube", name "Canción" |

After the last row click **Quitar** to continue.

### TC-04: Platform detection and name parsing
Run each row: type the input, click **Guardar canción**, assert the chip and the name, then click **Quitar**.

| Input | Chip | Name | Extra assertion |
|---|---|---|---|
| `nameFirstInput` | YouTube | Himno QA | **Abrir** href is `https://youtu.be/dQw4w9WgXcQ` |
| `ytMusicInput` | YouTube Music | Tema QA | n/a |
| `plainLinkInput` | Link | Tema web | n/a |
| `trailingDotInput` | YouTube | "." (observed: the stripped dot is left over as the name; report it as a minor finding if the product owner expects "Canción") | **Abrir** href has no trailing "." |
| `longNameInput` | YouTube | first 80 characters of the name | the shown name has 80 characters |
| `markupInput` | YouTube | `<i>x</i>` shown literally | no italic element is rendered |

### TC-05: Negative and edge cases
- Error text is replaced on success: type `noLink`, click **Guardar canción** (error shown), then type `youtubeInput` into the same field and click **Guardar canción**. Assert: the song row is shown and the error text is gone.
- The song is per student: add "Alumna QA B" in Alumnas, open her in Coreos. Assert: her Canción card shows the empty `#songin`, not the first student's link.
- An `http://` link is accepted although the message mentions https: type `http://example.test/cancion`, click **Guardar canción**. Assert: chip "Link" and name "Canción" (observed behavior, `okUrl` accepts `https?`).
- The song does not count as a choreography element: the checklist counters are unchanged after saving.

## Assertions
- [ ] Invalid input shows "Pegá un link que empiece con https://" in `#sgerr` and saves nothing.
- [ ] A valid link replaces the form with the platform chip, the name (or "Canción"), **Abrir** and **Quitar**.
- [ ] Platform chip is Spotify, YouTube, YouTube Music or Link according to the URL.
- [ ] The name is the text next to the link, up to 80 characters, and is HTML-escaped.
- [ ] **Abrir** opens in a new tab with `rel="noopener noreferrer"` (attributes only, never clicked).
- [ ] **Quitar** in the Canción card removes the link without confirmation.
- [ ] The song persists after reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx); no request is made to Spotify or YouTube.

## Screenshots required
- Canción card empty
- Validation error state
- Song saved (Spotify)
- Song saved (YouTube Music)
- Final state after **Quitar**

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
