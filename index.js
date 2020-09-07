/**  
 * Diese Anwendung demonstriert an einem einfachen Beispiel die Verwendung der 
 * word-freq Bibliothek für Node.js (https://github.com/waltfy/word-freq).
 *
 * Die Anwendung lädt eine Datei herunter, deren URL über einen Programm-Parameter
 * angegeben wird. Der Inhalt  wird in einer temporären Datei gespeichert und anschließend
 * mit Hilfe der word-freq-Bibliothek analysiert. Die erstelle Häufigkeitsverteilung
 * wird in eine Datei geschrieben und die temporäre Datei im Anschluss gelöscht.
 *
 * Mehr unter: https://github.com/Webtechnologien-Regensburg/Word-Frequency-Demo
 *
 * Für die verwendeten Template-Strings (`...`) siehe: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */

// Import der fs-Bibliothek für die Dateioperationen
import fs from "fs";
// Import der HTTPS-Bibliothek für das Herunterladen der Datei
import https from "https";
// Import der word-freq-Bibliothek für die Frequenzanalyse
import wf from "word-freq";

// Dateiname für das temopräre Speichern der heruntergeladenen Inhalte
const TMP_FILE = "download.tmp";

/**
 * Lädt den Inhalt der URL (url) herunter, speichert diesen in eine Datei (file)
 * und ruft anschließend den übergebenen Callback auf.
 */
function downloadToFile(url, file, callback) {
  // Erstellt den Ausgabe-Stream für die Datei, in der der Inhalt der URL gespeichert
  // werden soll.
  let stream = fs.createWriteStream(file);
  // Fängt das "finish"-Event ab, das ausgelöst wird, wenn der Ausgabe-Stream den Inhal
  // der URL vollständig verarbeitet hat. Das wird erst später passieren, nachdem die 
  // Anwort auf die HTTP-Anfrage in den Stream umgeleitet wurde!.
  stream.on("finish", callback);
  log(`Downloading ${url}`);
  // HTTP(S)-Anfrage zum Herunterladen der URL
  https.get(url, function(response) {
    log(`Saving content to ${file}`);
    // Wenn die Verbindung zum Server erfolgreich aufgebaut wurde, wird dessen Anwort
    // in den vorbereiteten Stream umgeleitet. Sobald alle Daten empfangen wurden, wird der
    // oben vorbereitete "finish"- Callback aufgerufen. 
    response.pipe(stream);
  });
}

/**
 * Liest den Inhalt der temporären Datei aus, bestimmt die Worthäufigkeit und speichert
 * diese in einer neuen Datei. Im Anschluss wird die temporäre Datei gelöscht.
 */
function saveFrequencyToFile() {
  log(`Reading from ${TMP_FILE}`);
  // Einlesen der heruntergeladenen Inhalte aus der temporären Datei
  fs.readFile(TMP_FILE, "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    // Erstellen der Frequenzanalyse mit Hilfe der importierten word-freq-Bibliothek
    let frequency = wf.freq(data, false, false),
      // Vorbereiten des Dateinamens für die Speicherung der Frequenzanalyse
      outputFile = `word-frequency-${Date.now()}.json`;
    log(`Saving word frequency to ${outputFile}`);
    // Schreiben der Frequenzanalyse (als JSON-String) in die Ausgabedatei
    fs.writeFileSync(outputFile, JSON.stringify(frequency));
    log("Removing temp file");
    // Löschen der temporäreren Datei
    fs.unlinkSync(TMP_FILE);
  });
}

/**
 * Hilfsfunktion zur Ausgabe von Log-Nachrichten.
 * 
 * Der als Parameter übergebene String (msg) wird zusammen mit der aktuellen
 * Uhrzeit auf der Konsole ausgegeben. 
 */
function log(msg) {
  // Speichert das aktuelle Datum bzw. die aktuelle Zeit
  let now = new Date();
  /* eslint-disable no-console*/
  // Erstellt den Log-String und gibt diesen aus. Verwendet wird ein Template-String,
  // der JavaScript-Code enthalten kann, der vor der Ausgabe ausgewertet wird. Hier
  // wird dadurch die Uhrzeit aus den Stunden-, Minuten- und Sekunden-Eigenschaften
  // des now-Objekts zusammengesetzt und mit dem msg-Parameter verbunden. Template-Strings
  // erlauben u.a. das erstellen komplexer Strings ohne auf die wenig performante Verknüpfung
  // der Bestandteil mittels "+"-Operator zurückgreifen zu müssen.
  console.log(
    `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:\t${msg}`);
  /* eslint-enable no-console*/
}

/**
 * Eintstiegspunkt in die Anwendung
 */
function run() {
  // Auslesen des Parameters, der die URL zur herunterzuladenden Datei beeinhaltet
  let url = process.argv[2];
  downloadToFile(url, TMP_FILE, saveFrequencyToFile);
}

run();