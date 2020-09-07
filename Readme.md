# Demo: word-freq Demo

Diese Demo zeigt Ihnen, wie Sie die [`word-freq`-Bibliothek](https://github.com/waltfy/word-freq) zur statistischen Textanalyse einsetzen können. Darüber hinaus können Sie hier auch noch einmal den Aufbau einer kleinen Node.js-Anwendung und die Verwendung der `fs`- und `https`-Bibliotheken sowie den Umgang mit *Callbacks* durcharbeiten.

## Vorbereitung

- Laden Sie den Inhalt des Projekts [herunter](https://github.com/Webtechnologien-Regensburg/Word-Frequency-Demo/archive/master.zip) und entpacken Sie den Ordner auf Ihrem Rechner.
- Rufen Sie den Projektordner in einer Kommandozeile auf und führen Sie dort den Befehl `npm install` aus, um die notwendigen Bibliotheken zu installieren.

### Demo

- Die vorbereitete Demo rufen Sie mit dem Befehl `npm run demo`auf.
- In der Demo lädt das Programm den Text des Shakespear-Dramas *Henry V* aus dem [Fogler-Online-Korpus](https://www.folger.edu/) herunter und erstellt eine Ausgabedatei mit der errechneten Wortfrequenz. 
- Sie können das Programm mit beliebigen anderen, online verfügbaren Texten, ausprobieren, in dem Sie es mit dem Befehl `node index.js URL` starten. Ersetzen Sie dabei `URL` durch die entsprechende URL zur Textdatei.

**Weitere Hinweise finden Sie als Kommentar im Code.**
