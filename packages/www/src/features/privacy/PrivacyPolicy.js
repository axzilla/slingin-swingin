// Packages
import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

import { Typography, Paper } from '@material-ui/core'

const PrivacyPolicy = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
  }, [])

  return (
    <Paper style={{ padding: '16px 24px', maxWidth: '100%' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Datenschutz
      </Typography>
      <Typography gutterBottom>
        Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck
        der Verarbeitung von personenbezogenen Daten (nachfolgend kurz „Daten“)
        im Rahmen der Erbringung unserer Leistungen sowie innerhalb unseres
        Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen und
        Inhalte sowie externen Onlinepräsenzen, wie z.B. unser Social Media
        Profile auf (nachfolgend gemeinsam bezeichnet als „Onlineangebot“). Im
        Hinblick auf die verwendeten Begrifflichkeiten, wie z.B. „Verarbeitung“
        oder „Verantwortlicher“ verweisen wir auf die Definitionen im Art. 4 der
        Datenschutzgrundverordnung (DSGVO). <br /> <br />
      </Typography>
      <Typography gutterBottom>
        <strong>Verantwortlicher: </strong>
        <br />
        <br />
        Axel Adrian
        <br />
        Hüllenkamp 72
        <br />
        22149 Hamburg
        <br />
        <br />
      </Typography>
      <Typography gutterBottom>
        <strong>Kontakt:</strong>
        <br />
        <br />
        E-Mail:{' '}
        <a href="mailto:office@codehustla.io" style={{ color: '#2196f3' }}>
          office@codehustla.io
        </a>
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Arten der verarbeiteten Daten: </strong>
        <br />
        <br />
        - Bestandsdaten (z.B., Personen-Stammdaten, Namen oder Adressen)
        <br />
        - Kontaktdaten (z.B., E-Mail, Telefonnummern)
        <br />
        - Inhaltsdaten (z.B.,Texteingaben, Fotografien, Videos)
        <br />
        - Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten,
        Zugriffszeiten)
        <br />
        - Meta-/Kommunikationsdaten (z.B., Geräte-Informationen, IP-Adressen)
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Kategorien betroffener Personen: </strong>
        <br />
        <br />
        Besucher und Nutzer des Onlineangebotes (Nachfolgend bezeichnen wir die
        betroffenen Personen zusammenfassend auch als „Nutzer“).
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Zweck der Verarbeitung: </strong>
        <br />
        <br />
        - Zurverfügungstellung des Onlineangebotes, seiner Funktionen und
        Inhalte.
        <br />
        - Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern.
        <br />
        - Sicherheitsmaßnahmen.
        <br />
        - Reichweitenmessung/Marketing
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Verwendete Begrifflichkeiten: </strong>
        <br />
        <br />
        „Personenbezogene Daten“ sind alle Informationen, die sich auf eine
        identifizierte oder identifizierbare natürliche Person (im Folgenden
        „betroffene Person“) beziehen; als identifizierbar wird eine natürliche
        Person angesehen, die direkt oder indirekt, insbesondere mittels
        Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu
        Standortdaten, zu einer Online-Kennung (z.B. Cookie) oder zu einem oder
        mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck
        der physischen, physiologischen, genetischen, psychischen,
        wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen
        Person sind.
        <br />
        <br />
        „Verarbeitung“ ist jeder mit oder ohne Hilfe automatisierter Verfahren
        ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit
        personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch
        jeden Umgang mit Daten.
        <br />
        <br />
        „Pseudonymisierung“ die Verarbeitung personenbezogener Daten in einer
        Weise, dass die personenbezogenen Daten ohne Hinzuziehung zusätzlicher
        Informationen nicht mehr einer spezifischen betroffenen Person
        zugeordnet werden können, sofern diese zusätzlichen Informationen
        gesondert aufbewahrt werden und technischen und organisatorischen
        Maßnahmen unterliegen, die gewährleisten, dass die personenbezogenen
        Daten nicht einer identifizierten oder identifizierbaren natürlichen
        Person zugewiesen werden.
        <br />
        <br />
        „Profiling“ jede Art der automatisierten Verarbeitung personenbezogener
        Daten, die darin besteht, dass diese personenbezogenen Daten verwendet
        werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche
        Person beziehen, zu bewerten, insbesondere um Aspekte bezüglich
        Arbeitsleistung, wirtschaftliche Lage, Gesundheit, persönliche
        Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder
        Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen.
        <br />
        <br />
        Als „Verantwortlicher“ wird die natürliche oder juristische Person,
        Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit
        anderen über die Zwecke und Mittel der Verarbeitung von
        personenbezogenen Daten entscheidet, bezeichnet.
        <br />
        <br />
        „Auftragsverarbeiter“ eine natürliche oder juristische Person, Behörde,
        Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag
        des Verantwortlichen verarbeitet.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Maßgebliche Rechtsgrundlagen:</strong>
        <br />
        <br />
        Nach Maßgabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen
        unserer Datenverarbeitungen mit. Für Nutzer aus dem Geltungsbereich der
        Datenschutzgrundverordnung (DSGVO), d.h. der EU und des EWG gilt, sofern
        die Rechtsgrundlage in der Datenschutzerklärung nicht genannt wird,
        Folgendes: Die Rechtsgrundlage für die Einholung von Einwilligungen ist
        Art. 6 Abs. 1 lit. a und Art. 7 DSGVO; Die Rechtsgrundlage für die
        Verarbeitung zur Erfüllung unserer Leistungen und Durchführung
        vertraglicher Maßnahmen sowie Beantwortung von Anfragen ist Art. 6 Abs.
        1 lit. b DSGVO; Die Rechtsgrundlage für die Verarbeitung zur Erfüllung
        unserer rechtlichen Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO; Für
        den Fall, dass lebenswichtige Interessen der betroffenen Person oder
        einer anderen natürlichen Person eine Verarbeitung personenbezogener
        Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als
        Rechtsgrundlage. Die Rechtsgrundlage für die erforderliche Verarbeitung
        zur Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder
        in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen
        übertragen wurde ist Art. 6 Abs. 1 lit. e DSGVO. Die Rechtsgrundlage für
        die Verarbeitung zur Wahrung unserer berechtigten Interessen ist Art. 6
        Abs. 1 lit. f DSGVO. Die Verarbeitung von Daten zu anderen Zwecken als
        denen, zu denen sie erhoben wurden, bestimmt sich nach den Vorgaben des
        Art 6 Abs. 4 DSGVO. Die Verarbeitung von besonderen Kategorien von Daten
        (entsprechend Art. 9 Abs. 1 DSGVO) bestimmt sich nach den Vorgaben des
        Art. 9 Abs. 2 DSGVO.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Sicherheitsmaßnahmen:</strong>
        <br />
        <br />
        Wir treffen nach Maßgabe der gesetzlichen Vorgabenunter Berücksichtigung
        des Stands der Technik, der Implementierungskosten und der Art, des
        Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der
        unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des Risikos
        für die Rechte und Freiheiten natürlicher Personen, geeignete technische
        und organisatorische Maßnahmen, um ein dem Risiko angemessenes
        Schutzniveau zu gewährleisten.
        <br />
        <br />
        Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit,
        Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen
        Zugangs zu den Daten, als auch des sie betreffenden Zugriffs, der
        Eingabe, Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung.
        Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von
        Betroffenenrechten, Löschung von Daten und Reaktion auf Gefährdung der
        Daten gewährleisten. Ferner berücksichtigen wir den Schutz
        personenbezogener Daten bereits bei der Entwicklung, bzw. Auswahl von
        Hardware, Software sowie Verfahren, entsprechend dem Prinzip des
        Datenschutzes durch Technikgestaltung und durch datenschutzfreundliche
        Voreinstellungen.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>
          Zusammenarbeit mit Auftragsverarbeitern, gemeinsam Verantwortlichen
          und Dritten:
        </strong>
        <br />
        <br />
        Sofern wir im Rahmen unserer Verarbeitung Daten gegenüber anderen
        Personen und Unternehmen (Auftragsverarbeitern, gemeinsam
        Verantwortlichen oder Dritten) offenbaren, sie an diese übermitteln oder
        ihnen sonst Zugriff auf die Daten gewähren, erfolgt dies nur auf
        Grundlage einer gesetzlichen Erlaubnis (z.B. wenn eine Übermittlung der
        Daten an Dritte, wie an Zahlungsdienstleister, zur Vertragserfüllung
        erforderlich ist), Nutzer eingewilligt haben, eine rechtliche
        Verpflichtung dies vorsieht oder auf Grundlage unserer berechtigten
        Interessen (z.B. beim Einsatz von Beauftragten, Webhostern, etc.).
        <br />
        <br />
        Sofern wir Daten anderen Unternehmen unserer Unternehmensgruppe
        offenbaren, übermitteln oder ihnen sonst den Zugriff gewähren, erfolgt
        dies insbesondere zu administrativen Zwecken als berechtigtes Interesse
        und darüberhinausgehend auf einer den gesetzlichen Vorgaben
        entsprechenden Grundlage.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Übermittlungen in Drittländer:</strong>
        <br />
        <br />
        Sofern wir Daten in einem Drittland (d.h. außerhalb der Europäischen
        Union (EU), des Europäischen Wirtschaftsraums (EWR) oder der Schweizer
        Eidgenossenschaft) verarbeiten oder dies im Rahmen der Inanspruchnahme
        von Diensten Dritter oder Offenlegung, bzw. Übermittlung von Daten an
        andere Personen oder Unternehmen geschieht, erfolgt dies nur, wenn es
        zur Erfüllung unserer (vor)vertraglichen Pflichten, auf Grundlage Ihrer
        Einwilligung, aufgrund einer rechtlichen Verpflichtung oder auf
        Grundlage unserer berechtigten Interessen geschieht. Vorbehaltlich
        ausdrücklicher Einwilligung oder vertraglich erforderlicher
        Übermittlung, verarbeiten oder lassen wir die Daten nur in Drittländern
        mit einem anerkannten Datenschutzniveau, zu denen die unter dem
        "Privacy-Shield" zertifizierten US-Verarbeiter gehören oder auf
        Grundlage besonderer Garantien, wie z.B. vertraglicher Verpflichtung
        durch sogenannte Standardschutzklauseln der EU-Kommission, dem Vorliegen
        von Zertifizierungen oder verbindlichen internen Datenschutzvorschriften
        verarbeiten (Art. 44 bis 49 DSGVO, Informationsseite der EU-Kommission).
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Rechte der betroffenen Personen:</strong>
        <br />
        <br />
        Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob
        betreffende Daten verarbeitet werden und auf Auskunft über diese Daten
        sowie auf weitere Informationen und Kopie der Daten entsprechend den
        gesetzlichen Vorgaben.
        <br />
        <br />
        Sie haben entsprechend. den gesetzlichen Vorgaben das Recht, die
        Vervollständigung der Sie betreffenden Daten oder die Berichtigung der
        Sie betreffenden unrichtigen Daten zu verlangen.
        <br />
        <br />
        Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht zu verlangen,
        dass betreffende Daten unverzüglich gelöscht werden, bzw. alternativ
        nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der
        Verarbeitung der Daten zu verlangen.
        <br />
        <br />
        Sie haben das Recht zu verlangen, dass die Sie betreffenden Daten, die
        Sie uns bereitgestellt haben nach Maßgabe der gesetzlichen Vorgaben zu
        erhalten und deren Übermittlung an andere Verantwortliche zu fordern.
        <br />
        <br />
        Sie haben ferner nach Maßgabe der gesetzlichen Vorgaben das Recht, eine
        Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Widerrufsrecht:</strong>
        <br />
        <br />
        Sie haben das Recht, erteilte Einwilligungen mit Wirkung für die Zukunft
        zu widerrufen.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Widerspruchsrecht:</strong>
        <br />
        <br />
        Sie können der künftigen Verarbeitung der Sie betreffenden Daten nach
        Maßgabe der gesetzlichen Vorgaben jederzeit widersprechen. Der
        Widerspruch kann insbesondere gegen die Verarbeitung für Zwecke der
        Direktwerbung erfolgen.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Cookies und Widerspruchsrecht bei Direktwerbung:</strong>
        <br />
        <br />
        Als „Cookies“ werden kleine Dateien bezeichnet, die auf Rechnern der
        Nutzer gespeichert werden. Innerhalb der Cookies können unterschiedliche
        Angaben gespeichert werden. Ein Cookie dient primär dazu, die Angaben zu
        einem Nutzer (bzw. dem Gerät auf dem das Cookie gespeichert ist) während
        oder auch nach seinem Besuch innerhalb eines Onlineangebotes zu
        speichern. Als temporäre Cookies, bzw. „Session-Cookies“ oder
        „transiente Cookies“, werden Cookies bezeichnet, die gelöscht werden,
        nachdem ein Nutzer ein Onlineangebot verlässt und seinen Browser
        schließt. In einem solchen Cookie kann z.B. der Inhalt eines Warenkorbs
        in einem Onlineshop oder ein Login-Status gespeichert werden. Als
        „permanent“ oder „persistent“ werden Cookies bezeichnet, die auch nach
        dem Schließen des Browsers gespeichert bleiben. So kann z.B. der
        Login-Status gespeichert werden, wenn die Nutzer diese nach mehreren
        Tagen aufsuchen. Ebenso können in einem solchen Cookie die Interessen
        der Nutzer gespeichert werden, die für Reichweitenmessung oder
        Marketingzwecke verwendet werden. Als „Third-Party-Cookie“ werden
        Cookies bezeichnet, die von anderen Anbietern als dem Verantwortlichen,
        der das Onlineangebot betreibt, angeboten werden (andernfalls, wenn es
        nur dessen Cookies sind spricht man von „First-Party Cookies“).
        <br />
        <br />
        Wir können temporäre und permanente Cookies einsetzen und klären
        hierüber im Rahmen unserer Datenschutzerklärung auf.
        <br />
        <br />
        Sofern wir die Nutzer um eine Einwilligung in den Einsatz von Cookies
        bitten (z.B. im Rahmen einer Cookie-Einwilligung), ist die
        Rechtsgrundlage dieser Verarbeitung Art. 6 Abs. 1 lit. a. DSGVO.
        Ansonsten werden die personenbezogenen Cookies der Nutzer entsprechend
        den nachfolgenden Erläuterungen im Rahmen dieser Datenschutzerklärung
        auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der
        Analyse, Optimierung und wirtschaftlichem Betrieb unseres
        Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) oder sofern
        der Einsatz von Cookies zur Erbringung unserer vertragsbezogenen
        Leistungen erforderlich ist, gem. Art. 6 Abs. 1 lit. b. DSGVO, bzw.
        sofern der Einsatz von Cookies für die Wahrnehmung einer Aufgabe, die im
        öffentlichen Interesse liegt erforderlich ist oder in Ausübung
        öffentlicher Gewalt erfolgt, gem. Art. 6 Abs. 1 lit. e. DSGVO,
        verarbeitet.
        <br />
        <br />
        Falls die Nutzer nicht möchten, dass Cookies auf ihrem Rechner
        gespeichert werden, werden sie gebeten die entsprechende Option in den
        Systemeinstellungen ihres Browsers zu deaktivieren. Gespeicherte Cookies
        können in den Systemeinstellungen des Browsers gelöscht werden. Der
        Ausschluss von Cookies kann zu Funktionseinschränkungen dieses
        Onlineangebotes führen.
        <br />
        <br />
        Ein genereller Widerspruch gegen den Einsatz der zu Zwecken des
        Onlinemarketing eingesetzten Cookies kann bei einer Vielzahl der
        Dienste, vor allem im Fall des Trackings, über die US-amerikanische
        Seite http://www.aboutads.info/choices/ oder die EU-Seite
        http://www.youronlinechoices.com/ erklärt werden. Des Weiteren kann die
        Speicherung von Cookies mittels deren Abschaltung in den Einstellungen
        des Browsers erreicht werden. Bitte beachten Sie, dass dann
        gegebenenfalls nicht alle Funktionen dieses Onlineangebotes genutzt
        werden können.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Löschung von Daten:</strong>
        <br />
        <br />
        Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen
        Vorgaben gelöscht oder in ihrer Verarbeitung eingeschränkt. Sofern nicht
        im Rahmen dieser Datenschutzerklärung ausdrücklich angegeben, werden die
        bei uns gespeicherten Daten gelöscht, sobald sie für ihre
        Zweckbestimmung nicht mehr erforderlich sind und der Löschung keine
        gesetzlichen Aufbewahrungspflichten entgegenstehen.
        <br />
        <br />
        Sofern die Daten nicht gelöscht werden, weil sie für andere und
        gesetzlich zulässige Zwecke erforderlich sind, wird deren Verarbeitung
        eingeschränkt. D.h. die Daten werden gesperrt und nicht für andere
        Zwecke verarbeitet. Das gilt z.B. für Daten, die aus handels- oder
        steuerrechtlichen Gründen aufbewahrt werden müssen.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>
          Änderungen und Aktualisierungen der Datenschutzerklärung:
        </strong>
        <br />
        <br />
        Wir bitten Sie sich regelmäßig über den Inhalt unserer
        Datenschutzerklärung zu informieren. Wir passen die Datenschutzerklärung
        an, sobald die Änderungen der von uns durchgeführten Datenverarbeitungen
        dies erforderlich machen. Wir informieren Sie, sobald durch die
        Änderungen eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder
        eine sonstige individuelle Benachrichtigung erforderlich wird.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Registrierfunktion:</strong>
        <br />
        <br />
        Nutzer können ein Nutzerkonto anlegen. Im Rahmen der Registrierung
        werden die erforderlichen Pflichtangaben den Nutzern mitgeteilt und auf
        Grundlage des Art. 6 Abs. 1 lit. b DSGVO zu Zwecken der Bereitstellung
        des Nutzerkontos verarbeitet. Zu den verarbeiteten Daten gehören
        insbesondere die Login-Informationen (Name, Passwort sowie eine
        E-Mailadresse). Die im Rahmen der Registrierung eingegebenen Daten
        werden für die Zwecke der Nutzung des Nutzerkontos und dessen Zwecks
        verwendet.
        <br />
        <br />
        Die Nutzer können über Informationen, die für deren Nutzerkonto relevant
        sind, wie z.B. technische Änderungen, per E-Mail informiert werden. Wenn
        Nutzer ihr Nutzerkonto gekündigt haben, werden deren Daten im Hinblick
        auf das Nutzerkonto, vorbehaltlich einer gesetzlichen
        Aufbewahrungspflicht, gelöscht. Es obliegt den Nutzern, ihre Daten bei
        erfolgter Kündigung vor dem Vertragsende zu sichern. Wir sind
        berechtigt, sämtliche während der Vertragsdauer gespeicherten Daten des
        Nutzers unwiederbringlich zu löschen.
        <br />
        <br />
        Im Rahmen der Inanspruchnahme unserer Registrierungs- und
        Anmeldefunktionen sowie der Nutzung des Nutzerkontos, speichern wir die
        IP-Adresse und den Zeitpunkt der jeweiligen Nutzerhandlung. Die
        Speicherung erfolgt auf Grundlage unserer berechtigten Interessen, als
        auch der Nutzer an Schutz vor Missbrauch und sonstiger unbefugter
        Nutzung. Eine Weitergabe dieser Daten an Dritte erfolgt grundsätzlich
        nicht, außer sie ist zur Verfolgung unserer Ansprüche erforderlich oder
        es besteht hierzu besteht eine gesetzliche Verpflichtung gem. Art. 6
        Abs. 1 lit. c. DSGVO. Die IP-Adressen werden spätestens nach 7 Tagen
        anonymisiert oder gelöscht.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Kommentare und Beiträge:</strong>
        <br />
        <br />
        Wenn Nutzer Kommentare oder sonstige Beiträge hinterlassen, können ihre
        IP-Adressen auf Grundlage unserer berechtigten Interessen im Sinne des
        Art. 6 Abs. 1 lit. f. DSGVO für 7 Tage gespeichert werden. Das erfolgt
        zu unserer Sicherheit, falls jemand in Kommentaren und Beiträgen
        widerrechtliche Inhalte hinterlässt (Beleidigungen, verbotene politische
        Propaganda, etc.). In diesem Fall können wir selbst für den Kommentar
        oder Beitrag belangt werden und sind daher an der Identität des
        Verfassers interessiert.
        <br />
        <br />
        Des Weiteren behalten wir uns vor, auf Grundlage unserer berechtigten
        Interessen gem. Art. 6 Abs. 1 lit. f. DSGVO, die Angaben der Nutzer
        zwecks Spamerkennung zu verarbeiten.
        <br />
        <br />
        Auf derselben Rechtsgrundlage behalten wir uns vor, im Fall von Umfragen
        die IP-Adressen der Nutzer für deren Dauer zu speichern und Cookies zu
        verwenden, um Mehrfachabstimmungen zu vermeiden.
        <br />
        <br />
        Die im Rahmen der Kommentare und Beiträge mitgeteilte Informationen zur
        Person, etwaige Kontakt- sowie Websiteinformationen als auch die
        inhaltlichen Angaben, werden von uns bis zum Widerspruch der Nutzer
        dauerhaft gespeichert.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Kommentarabonnements:</strong>
        <br />
        <br />
        Die Nachfolgekommentare können durch Nutzer mit deren Einwilligung gem.
        Art. 6 Abs. 1 lit. a DSGVO abonniert werden. Die Nutzer erhalten eine
        Bestätigungsemail, um zu überprüfen, ob sie der Inhaber der eingegebenen
        Emailadresse sind. Nutzer können laufende Kommentarabonnements jederzeit
        abbestellen. Die Bestätigungsemail wird Hinweise zu den
        Widerrufsmöglichkeiten enthalten. Für die Zwecke des Nachweises der
        Einwilligung der Nutzer, speichern wir den Anmeldezeitpunkt nebst der
        IP-Adresse der Nutzer und löschen diese Informationen, wenn Nutzer sich
        von dem Abonnement abmelden.
        <br />
        <br />
        Sie können den Empfang unseres Abonnements jederzeit kündigen, d.h. Ihre
        Einwilligungen widerrufen. Wir können die ausgetragenen E-Mailadressen
        bis zu drei Jahren auf Grundlage unserer berechtigten Interessen
        speichern bevor wir sie löschen, um eine ehemals gegebene Einwilligung
        nachweisen zu können. Die Verarbeitung dieser Daten wird auf den Zweck
        einer möglichen Abwehr von Ansprüchen beschränkt. Ein individueller
        Löschungsantrag ist jederzeit möglich, sofern zugleich das ehemalige
        Bestehen einer Einwilligung bestätigt wird.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Newsletter:</strong>
        <br />
        <br />
        Mit den nachfolgenden Hinweisen informieren wir Sie über die Inhalte
        unseres Newsletters sowie das Anmelde-, Versand- und das statistische
        Auswertungsverfahren sowie Ihre Widerspruchsrechte auf. Indem Sie
        unseren Newsletter abonnieren, erklären Sie sich mit dem Empfang und den
        beschriebenen Verfahren einverstanden.
        <br />
        <br />
        Inhalt des Newsletters: Wir versenden Newsletter, E-Mails und weitere
        elektronische Benachrichtigungen mit werblichen Informationen
        (nachfolgend „Newsletter“) nur mit der Einwilligung der Empfänger oder
        einer gesetzlichen Erlaubnis. Sofern im Rahmen einer Anmeldung zum
        Newsletter dessen Inhalte konkret umschrieben werden, sind sie für die
        Einwilligung der Nutzer maßgeblich. Im Übrigen enthalten unsere
        Newsletter Informationen zu unseren Leistungen und uns.
        <br />
        <br />
        Double-Opt-In und Protokollierung: Die Anmeldung zu unserem Newsletter
        erfolgt in einem sog. Double-Opt-In-Verfahren. D.h. Sie erhalten nach
        der Anmeldung eine E-Mail, in der Sie um die Bestätigung Ihrer Anmeldung
        gebeten werden. Diese Bestätigung ist notwendig, damit sich niemand mit
        fremden E-Mailadressen anmelden kann. Die Anmeldungen zum Newsletter
        werden protokolliert, um den Anmeldeprozess entsprechend den rechtlichen
        Anforderungen nachweisen zu können. Hierzu gehört die Speicherung des
        Anmelde- und des Bestätigungszeitpunkts, als auch der IP-Adresse. Ebenso
        werden die Änderungen Ihrer bei dem Versanddienstleister gespeicherten
        Daten protokolliert.
        <br />
        <br />
        Anmeldedaten: Um sich für den Newsletter anzumelden, reicht es aus, wenn
        Sie Ihre E-Mailadresse angeben. Optional bitten wir Sie einen Namen,
        zwecks persönlicher Ansprache im Newsletters anzugeben.
        <br />
        <br />
        Der Versand des Newsletters und die mit ihm verbundene Erfolgsmessung
        erfolgen auf Grundlage einer Einwilligung der Empfänger gem. Art. 6 Abs.
        1 lit. a, Art. 7 DSGVO i.V.m § 7 Abs. 2 Nr. 3 UWG oder falls eine
        Einwilligung nicht erforderlich ist, auf Grundlage unserer berechtigten
        Interessen am Direktmarketing gem. Art. 6 Abs. 1 lt. f. DSGVO i.V.m. § 7
        Abs. 3 UWG.
        <br />
        <br />
        Die Protokollierung des Anmeldeverfahrens erfolgt auf Grundlage unserer
        berechtigten Interessen gem. Art. 6 Abs. 1 lit. f DSGVO. Unser Interesse
        richtet sich auf den Einsatz eines nutzerfreundlichen sowie sicheren
        Newslettersystems, das sowohl unseren geschäftlichen Interessen dient,
        als auch den Erwartungen der Nutzer entspricht und uns ferner den
        Nachweis von Einwilligungen erlaubt.
        <br />
        <br />
        Die Protokollierung des Anmeldeverfahrens erfolgt auf Grundlage unserer
        Kündigung/Widerruf - Sie können den Empfang unseres Newsletters
        jederzeit kündigen, d.h. Ihre Einwilligungen widerrufen. Einen Link zur
        Kündigung des Newsletters finden Sie am Ende eines jeden Newsletters.
        Wir können die ausgetragenen E-Mailadressen bis zu drei Jahren auf
        Grundlage unserer berechtigten Interessen speichern bevor wir sie
        löschen, um eine ehemals gegebene Einwilligung nachweisen zu können. Die
        Verarbeitung dieser Daten wird auf den Zweck einer möglichen Abwehr von
        Ansprüchen beschränkt. Ein individueller Löschungsantrag ist jederzeit
        möglich, sofern zugleich das ehemalige Bestehen einer Einwilligung
        bestätigt wird.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Newsletter - Mailchimp:</strong>
        <br />
        <br />
        Der Versand der Newsletter erfolgt mittels des Versanddienstleisters
        „MailChimp“, einer Newsletterversandplattform des US-Anbieters Rocket
        Science Group, LLC, 675 Ponce De Leon Ave NE #5000, Atlanta, GA 30308,
        USA. Die Datenschutzbestimmungen des Versanddienstleisters können Sie
        hier einsehen: https://mailchimp.com/legal/privacy/. The Rocket Science
        Group LLC d/b/a MailChimp ist unter dem Privacy-Shield-Abkommen
        zertifiziert und bietet hierdurch eine Garantie, das europäisches
        Datenschutzniveau einzuhalten
        (https://www.privacyshield.gov/participant?id=a2zt0000000TO6hAAG&status=Active).
        Der Versanddienstleister wird auf Grundlage unserer berechtigten
        Interessen gem. Art. 6 Abs. 1 lit. f. DSGVO und eines
        Auftragsverarbeitungsvertrages gem. Art. 28 Abs. 3 S. 1 DSGVO
        eingesetzt.
        <br />
        <br />
        Der Versanddienstleister kann die Daten der Empfänger in pseudonymer
        Form, d.h. ohne Zuordnung zu einem Nutzer, zur Optimierung oder
        Verbesserung der eigenen Services nutzen, z.B. zur technischen
        Optimierung des Versandes und der Darstellung der Newsletter oder für
        statistische Zwecke verwenden. Der Versanddienstleister nutzt die Daten
        unserer Newsletterempfänger jedoch nicht, um diese selbst anzuschreiben
        oder um die Daten an Dritte weiterzugeben.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Newsletter - Erfolgsmessung:</strong>
        <br />
        <br />
        Die Newsletter enthalten einen sog. „web-beacon“, d.h. eine pixelgroße
        Datei, die beim Öffnen des Newsletters von unserem Server, bzw. sofern
        wir einen Versanddienstleister einsetzen, von dessen Server abgerufen
        wird. Im Rahmen dieses Abrufs werden zunächst technische Informationen,
        wie Informationen zum Browser und Ihrem System, als auch Ihre IP-Adresse
        und Zeitpunkt des Abrufs erhoben.
        <br />
        <br />
        Der Versanddienstleister kann die Daten der Empfänger in pseudonymer
        Diese Informationen werden zur technischen Verbesserung der Services
        anhand der technischen Daten oder der Zielgruppen und ihres
        Leseverhaltens anhand derer Abruforte (die mit Hilfe der IP-Adresse
        bestimmbar sind) oder der Zugriffszeiten genutzt. Zu den statistischen
        Erhebungen gehört ebenfalls die Feststellung, ob die Newsletter geöffnet
        werden, wann sie geöffnet werden und welche Links geklickt werden. Diese
        Informationen können aus technischen Gründen zwar den einzelnen
        Newsletterempfängern zugeordnet werden. Es ist jedoch weder unser
        Bestreben, noch, sofern eingesetzt, das des Versanddienstleisters,
        einzelne Nutzer zu beobachten. Die Auswertungen dienen uns viel mehr
        dazu, die Lesegewohnheiten unserer Nutzer zu erkennen und unsere Inhalte
        auf sie anzupassen oder unterschiedliche Inhalte entsprechend den
        Interessen unserer Nutzer zu versenden.
        <br />
        <br />
        Ein getrennter Widerruf der Erfolgsmessung ist leider nicht möglich, in
        diesem Fall muss das gesamte Newsletterabonnement gekündigt werden.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Hosting und E-Mail-Versand:</strong>
        <br />
        <br />
        Die von uns in Anspruch genommenen Hosting-Leistungen dienen der
        Zurverfügungstellung der folgenden Leistungen: Infrastruktur- und
        Plattformdienstleistungen, Rechenkapazität, Speicherplatz und
        Datenbankdienste, E-Mail-Versand, Sicherheitsleistungen sowie technische
        Wartungsleistungen, die wir zum Zwecke des Betriebs dieses
        Onlineangebotes einsetzen.
        <br />
        <br />
        Hierbei verarbeiten wir, bzw. unser Hostinganbieter Bestandsdaten,
        Kontaktdaten, Inhaltsdaten, Vertragsdaten, Nutzungsdaten, Meta- und
        Kommunikationsdaten von Kunden, Interessenten und Besuchern dieses
        Onlineangebotes auf Grundlage unserer berechtigten Interessen an einer
        effizienten und sicheren Zurverfügungstellung dieses Onlineangebotes
        gem. Art. 6 Abs. 1 lit. f DSGVO i.V.m. Art. 28 DSGVO (Abschluss
        Auftragsverarbeitungsvertrag).
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Erhebung von Zugriffsdaten und Logfiles:</strong>
        <br />
        <br />
        Wir, bzw. unser Hostinganbieter, erhebt auf Grundlage unserer
        berechtigten Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO Daten
        über jeden Zugriff auf den Server, auf dem sich dieser Dienst befindet
        (sogenannte Serverlogfiles). Zu den Zugriffsdaten gehören Name der
        abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs, übertragene
        Datenmenge, Meldung über erfolgreichen Abruf, Browsertyp nebst Version,
        das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite),
        IP-Adresse und der anfragende Provider.
        <br />
        <br />
        Logfile-Informationen werden aus Sicherheitsgründen (z.B. zur Aufklärung
        von Missbrauchs- oder Betrugshandlungen) für die Dauer von maximal 7
        Tagen gespeichert und danach gelöscht. Daten, deren weitere Aufbewahrung
        zu Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des
        jeweiligen Vorfalls von der Löschung ausgenommen.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Google Analytics:</strong>
        <br />
        <br />
        Wir setzen Google Analytics, einen Webanalysedienst der Google Ireland
        Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“) ein.
        Google verwendet Cookies. Die durch das Cookie erzeugten Informationen
        über Benutzung des Onlineangebotes durch die Nutzer werden in der Regel
        an einen Server von Google in den USA übertragen und dort gespeichert.
        <br />
        <br />
        Google wird diese Informationen in unserem Auftrag benutzen, um die
        Nutzung unseres Onlineangebotes durch die Nutzer auszuwerten, um Reports
        über die Aktivitäten innerhalb dieses Onlineangebotes zusammenzustellen
        und um weitere, mit der Nutzung dieses Onlineangebotes und der
        Internetnutzung verbundene Dienstleistungen, uns gegenüber zu erbringen.
        Dabei können aus den verarbeiteten Daten pseudonyme Nutzungsprofile der
        Nutzer erstellt werden.
        <br />
        <br />
        Wir setzen Google Analytics nur mit aktivierter IP-Anonymisierung ein.
        Das bedeutet, die IP-Adresse der Nutzer wird von Google innerhalb von
        Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten
        des Abkommens über den Europäischen Wirtschaftsraum gekürzt. Nur in
        Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in
        den USA übertragen und dort gekürzt.
        <br />
        <br />
        Die von dem Browser des Nutzers übermittelte IP-Adresse wird nicht mit
        anderen Daten von Google zusammengeführt. Die Nutzer können die
        Speicherung der Cookies durch eine entsprechende Einstellung ihrer
        Browser-Software verhindern; die Nutzer können darüber hinaus die
        Erfassung der durch das Cookie erzeugten und auf ihre Nutzung des
        Onlineangebotes bezogenen Daten an Google sowie die Verarbeitung dieser
        Daten durch Google verhindern, indem sie das unter folgendem Link
        verfügbare Browser-Plugin herunterladen und installieren:
        http://tools.google.com/dlpage/gaoptout?hl=de.
        <br />
        <br />
        Sofern wir die Nutzer um eine Einwilligung bitten (z.B. im Rahmen einer
        Cookie-Einwilligung), ist die Rechtsgrundlage dieser Verarbeitung Art. 6
        Abs. 1 lit. a. DSGVO. Ansonsten werden die personenbezogenen Daten der
        Nutzer auf Grundlage unserer berechtigten Interessen (d.h. Interesse an
        der Analyse, Optimierung und wirtschaftlichem Betrieb unseres
        Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) verarbeitet.
        <br />
        <br />
        Soweit Daten in den USA verarbeitet werden, weisen wir daraufhin, dass
        Google unter dem Privacy-Shield-Abkommen zertifiziert ist und hierdurch
        zusichert, das europäische Datenschutzrecht einzuhalten
        (https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active).
        <br />
        <br />
        Weitere Informationen zur Datennutzung durch Google, Einstellungs- und
        Widerspruchsmöglichkeiten, erfahren Sie in der Datenschutzerklärung von
        Google (https://policies.google.com/privacy) sowie in den Einstellungen
        für die Darstellung von Werbeeinblendungen durch Google
        (https://adssettings.google.com/authenticated).
        <br />
        <br />
        Die personenbezogenen Daten der Nutzer werden nach 14 Monaten gelöscht
        oder anonymisiert.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Google Universal Analytics:</strong>
        <br />
        <br />
        Wir setzen Google Analytics in der Ausgestaltung als
        „Universal-Analytics“ ein. „Universal Analytics“ bezeichnet ein
        Verfahren von Google Analytics, bei dem die Nutzeranalyse auf Grundlage
        einer pseudonymen Nutzer-ID erfolgt und damit ein pseudonymes Profil des
        Nutzers mit Informationen aus der Nutzung verschiedener Geräten erstellt
        wird (sog. „Cross-Device-Tracking“).
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>LinkedIn Marketing-Dienste:</strong>
        <br />
        <br />
        Wir nutzen die Marketing-Dienste des sozialen Netzwerks LinkedIn.
        Anbieter ist die LinkedIn Corporation, 2029 Stierlin Court, Mountain
        View, CA 94043, USA.
        <br />
        <br />
        Mit Hilfe der Marketing-Dienste von LinkedIn können wir innerhalb des
        sozialen Netzwerks und der Angebote der Werbepartner von LinkedIn
        Anzeigen gezielter anzeigen oder um Nutzern nur Anzeigen präsentieren,
        die potentiell deren Interessen entsprechen. Falls einem Nutzer z.B.
        Anzeigen für Produkte angezeigt werden, für die er sich auf anderen
        Onlineangeboten interessiert hat, spricht man hierbei vom „Remarketing“.
        Ferner können wir nachhalten, welchen Erfolg unsere Anzeigen erzielt
        haben (sog "Conversion-Messung"). Wir erfahren jedoch nur die anonyme
        Gesamtanzahl der Nutzer, die auf unsere Anzeige geklickt haben und zu
        einer mit einem Conversion-Tracking-Tag versehenen Seite weitergeleitet
        wurden. Wir erhalten jedoch keine Informationen, mit denen sich Nutzer
        persönlich identifizieren lassen.
        <br />
        <br />
        Zu den vorgenannten Zwecken wird bei Aufruf unserer und anderer
        Webseiten, auf denen die Marketing-Dienste von LinkedIn aktiv sind, ein
        Code von LinkedIn ausgeführt und es werden sog. "Insights-Tags"
        (unsichtbare Grafiken oder Code, auch als "Web Beacons" bezeichnet) in
        die Webseiten eingebunden. Mit deren Hilfe wird auf dem Gerät der Nutzer
        ein individuelles Cookie, d.h. eine kleine Datei abgespeichert (statt
        Cookies können auch vergleichbare Technologien verwendet werden). In
        dieser Datei wird vermerkt, welche Webseiten der Nutzer aufgesucht, für
        welche Inhalte er sich interessiert und welche Angebote der Nutzer
        geklickt hat, ferner technische Informationen zum Browser und
        Betriebssystem, verweisende Webseiten, Besuchszeit sowie weitere Angaben
        zur Nutzung des Onlineangebotes.
        <br />
        <br />
        Die Daten der Nutzer werden im Rahmen der Marketing-Dienste von LinkedIn
        pseudonym verarbeitet. D.h. LinkedIn speichert und verarbeitet z.B.
        nicht den Namen oder die E-Mailadresse der Nutzer, sondern verarbeitet
        die relevanten Daten cookie-bezogen innerhalb pseudonymer Nutzerprofile.
        D.h. aus der Sicht von LinkedIn werden die Anzeigen nicht für eine
        konkret identifizierte Person verwaltet und angezeigt, sondern für den
        Cookie-Inhaber, unabhängig davon wer dieser Cookie-Inhaber ist. Dies
        gilt nicht, wenn ein Nutzer LinkedIn ausdrücklich erlaubt hat, die Daten
        ohne diese Pseudonymisierung zu verarbeiten. Auch wenn Sie bei LinkedIn
        registriert sind, ist es LinkedIn möglich, Ihrer Interaktion mit unserem
        Onlineangebot Ihrem Benutzerkonto zuzuordnen.
        <br />
        <br />
        Sofern wir die Nutzer um eine Einwilligung bitten (z.B. im Rahmen einer
        Cookie-Einwilligung), ist die Rechtsgrundlage dieser Verarbeitung Art. 6
        Abs. 1 lit. a. DSGVO. Ansonsten werden die personenbezogenen Daten der
        Nutzer auf Grundlage unserer berechtigten Interessen (d.h. Interesse an
        der Analyse, Optimierung und wirtschaftlichem Betrieb unseres
        Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) verarbeitet.
        <br />
        <br />
        Die über die Nutzer gesammelten Informationen werden an LinkedIn
        übermittelt und auf Googles Servern in den USA gespeichert, wobei
        LinkedIn unter dem Privacy-Shield-Abkommen zertifiziert ist und
        hierdurch zusichert, das europäische Datenschutzrecht einzuhalten (
        https://www.privacyshield.gov/participant?id=a2zt0000000L0UZAA0&status=Active).
        <br />
        <br />
        Weitere Informationen zur Datennutzung durch LinkedIn erfahren Sie in
        der Datenschutzerklärung (https://www.linkedin.com/legal/privacy-policy)
        und der Cookie-Richtlinie von LinkedIn
        (https://www.linkedin.com/legal/cookie_policy). Der vorgenannten Nutzung
        Ihrer Daten können Sie bei LinkedIn widersprechen:
        https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>
          Facebook-Pixel, Custom Audiences und Facebook-Conversion:
        </strong>
        <br />
        <br />
        Innerhalb unseres Onlineangebotes wird das sog. "Facebook-Pixel" des
        sozialen Netzwerkes Facebook, welches von der Facebook Ireland Ltd., 4
        Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland betrieben wird
        ("Facebook"), eingesetzt.
        <br />
        <br />
        Mit Hilfe des Facebook-Pixels ist es Facebook zum einen möglich, die
        Besucher unseres Onlineangebotes als Zielgruppe für die Darstellung von
        Anzeigen (sog. "Facebook-Ads") zu bestimmen. Dementsprechend setzen wir
        das Facebook-Pixel ein, um die durch uns geschalteten Facebook-Ads nur
        solchen Facebook-Nutzern anzuzeigen, die auch ein Interesse an unserem
        Onlineangebot gezeigt haben oder die bestimmte Merkmale (z.B. Interessen
        an bestimmten Themen oder Produkten, die anhand der besuchten Webseiten
        bestimmt werden) aufweisen, die wir an Facebook übermitteln (sog.
        „Custom Audiences“). Mit Hilfe des Facebook-Pixels möchten wir auch
        sicherstellen, dass unsere Facebook-Ads dem potentiellen Interesse der
        Nutzer entsprechen und nicht belästigend wirken. Mit Hilfe des
        Facebook-Pixels können wir ferner die Wirksamkeit der
        Facebook-Werbeanzeigen für statistische und Marktforschungszwecke
        nachvollziehen, in dem wir sehen ob Nutzer nachdem Klick auf eine
        Facebook-Werbeanzeige auf unsere Website weitergeleitet wurden (sog.
        „Conversion“).
        <br />
        <br />
        Die Verarbeitung der Daten durch Facebook erfolgt im Rahmen von
        Facebooks Datenverwendungsrichtlinie. Dementsprechend generelle Hinweise
        zur Darstellung von Facebook-Ads, in der Datenverwendungsrichtlinie von
        Facebook: https://www.facebook.com/policy. Spezielle Informationen und
        Details zum Facebook-Pixel und seiner Funktionsweise erhalten Sie im
        Hilfebereich von Facebook:
        https://www.facebook.com/business/help/651294705016616.
        <br />
        <br />
        Sofern wir die Nutzer um eine Einwilligung bitten (z.B. im Rahmen einer
        Cookie-Einwilligung), ist die Rechtsgrundlage dieser Verarbeitung Art. 6
        Abs. 1 lit. a. DSGVO. Ansonsten werden die personenbezogenen Daten der
        Nutzer auf Grundlage unserer berechtigten Interessen (d.h. Interesse an
        der Analyse, Optimierung und wirtschaftlichem Betrieb unseres
        Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) verarbeitet.
        <br />
        <br />
        Facebook ist unter dem Privacy-Shield-Abkommen zertifiziert und sichert
        hierdurch zu, das europäische Datenschutzrecht einzuhalten
        (https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active).
        <br />
        <br />
        Sie können der Erfassung durch den Facebook-Pixel und Verwendung Ihrer
        Daten zur Darstellung von Facebook-Ads widersprechen. Um einzustellen,
        welche Arten von Werbeanzeigen Ihnen innerhalb von Facebook angezeigt
        werden, können Sie die von Facebook eingerichtete Seite aufrufen und
        dort die Hinweise zu den Einstellungen nutzungsbasierter Werbung
        befolgen: https://www.facebook.com/settings?tab=ads. Die Einstellungen
        erfolgen plattformunabhängig, d.h. sie werden für alle Geräte, wie
        Desktopcomputer oder mobile Geräte übernommen.
        <br />
        <br />
        Sie können dem Einsatz von Cookies, die der Reichweitenmessung und
        Werbezwecken dienen, ferner über die Deaktivierungsseite der
        Netzwerkwerbeinitiative (http://optout.networkadvertising.org/) und
        zusätzlich die US-amerikanische Webseite
        (http://www.aboutads.info/choices) oder die europäische Webseite
        (http://www.youronlinechoices.com/uk/your-ad-choices/) widersprechen.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Onlinepräsenzen in sozialen Medien:</strong>
        <br />
        <br />
        Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und
        Plattformen, um mit den dort aktiven Kunden, Interessenten und Nutzern
        kommunizieren und sie dort über unsere Leistungen informieren zu können.
        <br />
        <br />
        Wir weisen darauf hin, dass dabei Daten der Nutzer außerhalb des Raumes
        der Europäischen Union verarbeitet werden können. Hierdurch können sich
        für die Nutzer Risiken ergeben, weil so z.B. die Durchsetzung der Rechte
        der Nutzer erschwert werden könnte. Im Hinblick auf US-Anbieter die
        unter dem Privacy-Shield zertifiziert sind, weisen wir darauf hin, dass
        sie sich damit verpflichten, die Datenschutzstandards der EU
        einzuhalten.
        <br />
        <br />
        Ferner werden die Daten der Nutzer im Regelfall für Marktforschungs- und
        Werbezwecke verarbeitet. So können z.B. aus dem Nutzungsverhalten und
        sich daraus ergebenden Interessen der Nutzer Nutzungsprofile erstellt
        werden. Die Nutzungsprofile können wiederum verwendet werden, um z.B.
        Werbeanzeigen innerhalb und außerhalb der Plattformen zu schalten, die
        mutmaßlich den Interessen der Nutzer entsprechen. Zu diesen Zwecken
        werden im Regelfall Cookies auf den Rechnern der Nutzer gespeichert, in
        denen das Nutzungsverhalten und die Interessen der Nutzer gespeichert
        werden. Ferner können in den Nutzungsprofilen auch Daten unabhängig der
        von den Nutzern verwendeten Geräte gespeichert werden (insbesondere wenn
        die Nutzer Mitglieder der jeweiligen Plattformen sind und bei diesen
        eingeloggt sind).
        <br />
        <br />
        Die Verarbeitung der personenbezogenen Daten der Nutzer erfolgt auf
        Grundlage unserer berechtigten Interessen an einer effektiven
        Information der Nutzer und Kommunikation mit den Nutzern gem. Art. 6
        Abs. 1 lit. f. DSGVO. Falls die Nutzer von den jeweiligen Anbietern der
        Plattformen um eine Einwilligung in die vorbeschriebene
        Datenverarbeitung gebeten werden, ist die Rechtsgrundlage der
        Verarbeitung Art. 6 Abs. 1 lit. a., Art. 7 DSGVO.
        <br />
        <br />
        Für eine detaillierte Darstellung der jeweiligen Verarbeitungen und der
        Widerspruchsmöglichkeiten (Opt-Out), verweisen wir auf die nachfolgend
        verlinkten Angaben der Anbieter.
        <br />
        <br />
        Auch im Fall von Auskunftsanfragen und der Geltendmachung von
        Nutzerrechten, weisen wir darauf hin, dass diese am effektivsten bei den
        Anbietern geltend gemacht werden können. Nur die Anbieter haben jeweils
        Zugriff auf die Daten der Nutzer und können direkt entsprechende
        Maßnahmen ergreifen und Auskünfte geben. Sollten Sie dennoch Hilfe
        benötigen, dann können Sie sich an uns wenden.
        <br />
        <br />
        - Facebook, -Seiten, -Gruppen, (Facebook Ireland Ltd., 4 Grand Canal
        Square, Grand Canal Harbour, Dublin 2, Irland) auf Grundlage einer
        Vereinbarung über gemeinsame Verarbeitung personenbezogener Daten -
        Datenschutzerklärung: https://www.facebook.com/about/privacy/, speziell
        für Seiten:
        https://www.facebook.com/legal/terms/information_about_page_insights_data
        , Opt-Out: https://www.facebook.com/settings?tab=ads und
        http://www.youronlinechoices.com, Privacy Shield:
        https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active.
        <br />
        <br />
        - Google/ YouTube (Google Ireland Limited, Gordon House, Barrow Street,
        Dublin 4, Irland) – Datenschutzerklärung:
        https://policies.google.com/privacy, Opt-Out:
        https://adssettings.google.com/authenticated, Privacy Shield:
        https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active.
        <br />
        <br />
        - Instagram (Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025,
        USA) – Datenschutzerklärung/ Opt-Out:
        http://instagram.com/about/legal/privacy/.
        <br />
        <br />
        - Twitter (Twitter Inc., 1355 Market Street, Suite 900, San Francisco,
        CA 94103, USA) - Datenschutzerklärung: https://twitter.com/de/privacy,
        Opt-Out: https://twitter.com/personalization, Privacy Shield:
        https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&status=Active.
        <br />
        <br />
        - Pinterest (Pinterest Inc., 635 High Street, Palo Alto, CA, 94301, USA)
        – Datenschutzerklärung/ Opt-Out:
        https://about.pinterest.com/de/privacy-policy.
        <br />
        <br />
        - LinkedIn (LinkedIn Ireland Unlimited Company Wilton Place, Dublin 2,
        Irland) - Datenschutzerklärung
        https://www.linkedin.com/legal/privacy-policy , Opt-Out:
        https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out,
        Privacy Shield:
        https://www.privacyshield.gov/participant?id=a2zt0000000L0UZAA0&status=Active.
        <br />
        <br />
        - Xing (XING AG, Dammtorstraße 29-32, 20354 Hamburg, Deutschland) -
        Datenschutzerklärung/ Opt-Out:
        https://privacy.xing.com/de/datenschutzerklaerung.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Einbindung von Diensten und Inhalten Dritter:</strong>
        <br />
        <br />
        Wir setzen innerhalb unseres Onlineangebotes auf Grundlage unserer
        berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und
        wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des Art. 6
        Abs. 1 lit. f. DSGVO) Inhalts- oder Serviceangebote von Drittanbietern
        ein, um deren Inhalte und Services, wie z.B. Videos oder Schriftarten
        einzubinden (nachfolgend einheitlich bezeichnet als “Inhalte”)
        <br />
        <br />
        Dies setzt immer voraus, dass die Drittanbieter dieser Inhalte, die
        IP-Adresse der Nutzer wahrnehmen, da sie ohne die IP-Adresse die Inhalte
        nicht an deren Browser senden könnten. Die IP-Adresse ist damit für die
        Darstellung dieser Inhalte erforderlich. Wir bemühen uns nur solche
        Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse lediglich
        zur Auslieferung der Inhalte verwenden. Drittanbieter können ferner so
        genannte Pixel-Tags (unsichtbare Grafiken, auch als "Web Beacons"
        bezeichnet) für statistische oder Marketingzwecke verwenden. Durch die
        "Pixel-Tags" können Informationen, wie der Besucherverkehr auf den
        Seiten dieser Website ausgewertet werden. Die pseudonymen Informationen
        können ferner in Cookies auf dem Gerät der Nutzer gespeichert werden und
        unter anderem technische Informationen zum Browser und Betriebssystem,
        verweisende Webseiten, Besuchszeit sowie weitere Angaben zur Nutzung
        unseres Onlineangebotes enthalten, als auch mit solchen Informationen
        aus anderen Quellen verbunden werden.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Vimeo:</strong>
        <br />
        <br />
        Wir können die Videos der Plattform “Vimeo” des Anbieters Vimeo Inc.,
        Attention: Legal Department, 555 West 18th Street New York, New York
        10011, USA, einbinden. Datenschutzerklärung: https://vimeo.com/privacy.
        Wir weisen darauf hin, dass Vimeo Google Analytics einsetzen kann und
        verweisen hierzu auf die Datenschutzerklärung
        (https://policies.google.com/privacy) sowie Opt-Out-Möglichkeiten für
        Google-Analytics (http://tools.google.com/dlpage/gaoptout?hl=de) oder
        die Einstellungen von Google für die Datennutzung zu Marketingzwecken
        (https://adssettings.google.com/).
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Youtube:</strong>
        <br />
        <br />
        Wir binden die Videos der Plattform “YouTube” des Anbieters Google
        Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, ein.
        Datenschutzerklärung: https://www.google.com/policies/privacy/, Opt-Out:
        https://adssettings.google.com/authenticated.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Google Fonts:</strong>
        <br />
        <br />
        Wir binden die Schriftarten ("Google Fonts") des Anbieters Google
        Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, ein.
        Nach Angaben von Google werden die Daten der Nutzer allein zu Zwecken
        der Darstellung der Schriftarten im Browser der Nutzer verwendet. Die
        Einbindung erfolgt auf Grundlage unserer berechtigten Interessen an
        einer technisch sicheren, wartungsfreien und effizienten Nutzung von
        Schriftarten, deren einheitlicher Darstellung sowie Berücksichtigung
        möglicher lizenzrechtlicher Restriktionen für deren Einbindung.
        Datenschutzerklärung: https://www.google.com/policies/privacy/.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Google ReCaptcha:</strong>
        <br />
        <br />
        Wir binden die Funktion zur Erkennung von Bots, z.B. bei Eingaben in
        Onlineformularen ("ReCaptcha") des Anbieters GGoogle Ireland Limited,
        Gordon House, Barrow Street, Dublin 4, Irland, ein.
        Datenschutzerklärung: https://www.google.com/policies/privacy/, Opt-Out:
        https://adssettings.google.com/authenticated.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Google Maps:</strong>
        <br />
        <br />
        Wir binden die Landkarten des Dienstes “Google Maps” des Anbieters
        Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland,
        ein. Zu den verarbeiteten Daten können insbesondere IP-Adressen und
        Standortdaten der Nutzer gehören, die jedoch nicht ohne deren
        Einwilligung (im Regelfall im Rahmen der Einstellungen ihrer Mobilgeräte
        vollzogen), erhoben werden. Die Daten können in den USA verarbeitet
        werden. Datenschutzerklärung: https://www.google.com/policies/privacy/,
        Opt-Out: https://adssettings.google.com/authenticated.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>OpenStreetMap:</strong>
        <br />
        <br />
        Wir binden die Landkarten des Dienstes "OpenStreetMap" ein
        (https://www.openstreetmap.de), die auf Grundlage der Open Data Commons
        Open Database Lizenz (ODbL) durch die OpenStreetMap Foundation (OSMF)
        angeboten werden. Datenschutzerklärung:
        https://wiki.openstreetmap.org/wiki/Privacy_Policy.
        <br />
        <br />
        Nach unserer Kenntnis werden die Daten der Nutzer durch OpenStreetMap
        ausschließlich zu Zwecken der Darstellung der Kartenfunktionen und
        Zwischenspeicherung der gewählten Einstellungen verwendet. Zu diesen
        Daten können insbesondere IP-Adressen und Standortdaten der Nutzer
        gehören, die jedoch nicht ohne deren Einwilligung (im Regelfall im
        Rahmen der Einstellungen ihrer Mobilgeräte vollzogen), erhoben werden.
        <br />
        <br />
        Die Daten können in den USA verarbeitet werden. Weitere Informationen
        können Sie der Datenschutzerklärung von OpenStreetMap entnehmen:
        https://wiki.openstreetmap.org/wiki/Privacy_Policy.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Verwendung von Facebook Social Plugins:</strong>
        <br />
        <br />
        Wir nutzen auf Grundlage unserer berechtigten Interessen (d.h. Interesse
        an der Analyse, Optimierung und wirtschaftlichem Betrieb unseres
        Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Social Plugins
        ("Plugins") des sozialen Netzwerkes facebook.com, welches von der
        Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin
        2, Irland betrieben wird ("Facebook"). Hierzu können z.B. Inhalte wie
        Bilder, Videos oder Texte und Schaltflächen gehören, mit denen Nutzer
        Inhalte dieses Onlineangebotes innerhalb von Facebook teilen können. Die
        Liste und das Aussehen der Facebook Social Plugins kann hier eingesehen
        werden: https://developers.facebook.com/docs/plugins/.
        <br />
        <br />
        Facebook ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet
        hierdurch eine Garantie, das europäische Datenschutzrecht einzuhalten
        (https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active).
        <br />
        <br />
        Wenn ein Nutzer eine Funktion dieses Onlineangebotes aufruft, die ein
        solches Plugin enthält, baut sein Gerät eine direkte Verbindung mit den
        Servern von Facebook auf. Der Inhalt des Plugins wird von Facebook
        direkt an das Gerät des Nutzers übermittelt und von diesem in das
        Onlineangebot eingebunden. Dabei können aus den verarbeiteten Daten
        Nutzungsprofile der Nutzer erstellt werden. Wir haben daher keinen
        Einfluss auf den Umfang der Daten, die Facebook mit Hilfe dieses Plugins
        erhebt und informiert die Nutzer daher entsprechend unserem
        Kenntnisstand.
        <br />
        <br />
        Durch die Einbindung der Plugins erhält Facebook die Information, dass
        ein Nutzer die entsprechende Seite des Onlineangebotes aufgerufen hat.
        Ist der Nutzer bei Facebook eingeloggt, kann Facebook den Besuch seinem
        Facebook-Konto zuordnen. Wenn Nutzer mit den Plugins interagieren, zum
        Beispiel den Like Button betätigen oder einen Kommentar abgeben, wird
        die entsprechende Information von Ihrem Gerät direkt an Facebook
        übermittelt und dort gespeichert. Falls ein Nutzer kein Mitglied von
        Facebook ist, besteht trotzdem die Möglichkeit, dass Facebook seine
        IP-Adresse in Erfahrung bringt und speichert. Laut Facebook wird in
        Deutschland nur eine anonymisierte IP-Adresse gespeichert.
        <br />
        <br />
        Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und
        Nutzung der Daten durch Facebook sowie die diesbezüglichen Rechte und
        Einstellungsmöglichkeiten zum Schutz der Privatsphäre der Nutzer, können
        diese den Datenschutzhinweisen von Facebook entnehmen:
        https://www.facebook.com/about/privacy/.
        <br />
        <br />
        Wenn ein Nutzer Facebookmitglied ist und nicht möchte, dass Facebook
        über dieses Onlineangebot Daten über ihn sammelt und mit seinen bei
        Facebook gespeicherten Mitgliedsdaten verknüpft, muss er sich vor der
        Nutzung unseres Onlineangebotes bei Facebook ausloggen und seine Cookies
        löschen. Weitere Einstellungen und Widersprüche zur Nutzung von Daten
        für Werbezwecke, sind innerhalb der Facebook-Profileinstellungen
        möglich: https://www.facebook.com/settings?tab=ads oder über die
        US-amerikanische Seite http://www.aboutads.info/choices/ oder die
        EU-Seite http://www.youronlinechoices.com/. Die Einstellungen erfolgen
        plattformunabhängig, d.h. sie werden für alle Geräte, wie
        Desktopcomputer oder mobile Geräte übernommen.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Twitter:</strong>
        <br />
        <br />
        Innerhalb unseres Onlineangebotes können Funktionen und Inhalte des
        Dienstes Twitter, angeboten durch die Twitter Inc., 1355 Market Street,
        Suite 900, San Francisco, CA 94103, USA, eingebunden werden. Hierzu
        können z.B. Inhalte wie Bilder, Videos oder Texte und Schaltflächen
        gehören, mit denen Nutzer Inhalte dieses Onlineangebotes innerhalb von
        Twitter teilen können.
        <br />
        <br />
        Sofern die Nutzer Mitglieder der Plattform Twitter sind, kann Twitter
        den Aufruf der o.g. Inhalte und Funktionen den dortigen Profilen der
        Nutzer zuordnen. Twitter ist unter dem Privacy-Shield-Abkommen
        zertifiziert und bietet hierdurch eine Garantie, das europäische
        Datenschutzrecht einzuhalten
        (https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&status=Active).
        Datenschutzerklärung: https://twitter.com/de/privacy, Opt-Out:
        https://twitter.com/personalization.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Instagram:</strong>
        <br />
        <br />
        Innerhalb unseres Onlineangebotes können Funktionen und Inhalte des
        Dienstes Instagram, angeboten durch die Instagram Inc., 1601 Willow
        Road, Menlo Park, CA, 94025, USA, eingebunden werden. Hierzu können z.B.
        Inhalte wie Bilder, Videos oder Texte und Schaltflächen gehören, mit
        denen Nutzer Inhalte dieses Onlineangebotes innerhalb von Instagram
        teilen können. Sofern die Nutzer Mitglieder der Plattform Instagram
        sind, kann Instagram den Aufruf der o.g. Inhalte und Funktionen den
        dortigen Profilen der Nutzer zuordnen. Datenschutzerklärung von
        Instagram: http://instagram.com/about/legal/privacy/.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Pinterest:</strong>
        <br />
        <br />
        Innerhalb unseres Onlineangebotes können Funktionen und Inhalte des
        Dienstes Pinterest, angeboten durch die Pinterest Inc., 635 High Street,
        Palo Alto, CA, 94301, USA, eingebunden werden. Hierzu können z.B.
        Inhalte wie Bilder, Videos oder Texte und Schaltflächen gehören, mit
        denen Nutzer Inhalte dieses Onlineangebotes innerhalb von Pinterest
        teilen können. Sofern die Nutzer Mitglieder der Plattform Pinterest
        sind, kann Pinterest den Aufruf der o.g. Inhalte und Funktionen den
        dortigen Profilen der Nutzer zuordnen. Datenschutzerklärung von
        Pinterest: https://about.pinterest.com/de/privacy-policy.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Xing:</strong>
        <br />
        <br />
        Innerhalb unseres Onlineangebotes können Funktionen und Inhalte des
        Dienstes Xing, angeboten durch die XING AG, Dammtorstraße 29-32, 20354
        Hamburg, Deutschland, eingebunden werden. Hierzu können z.B. Inhalte wie
        Bilder, Videos oder Texte und Schaltflächen gehören, mit denen Nutzer
        Inhalte dieses Onlineangebotes innerhalb von Xing teilen können. Sofern
        die Nutzer Mitglieder der Plattform Xing sind, kann Xing den Aufruf der
        o.g. Inhalte und Funktionen den dortigen Profilen der Nutzer zuordnen.
        Datenschutzerklärung von Xing:
        https://privacy.xing.com/de/datenschutzerklaerung.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>LinkedIn:</strong>
        <br />
        <br />
        Innerhalb unseres Onlineangebotes können Funktionen und Inhalte des
        Dienstes LinkedIn, angeboten durch die LinkedIn Ireland Unlimited
        Company Wilton Place, Dublin 2, Irland, eingebunden werden. Hierzu
        können z.B. Inhalte wie Bilder, Videos oder Texte und Schaltflächen
        gehören, mit denen Nutzer Inhalte dieses Onlineangebotes innerhalb von
        LinkedIn teilen können. Sofern die Nutzer Mitglieder der Plattform
        LinkedIn sind, kann LinkedIn den Aufruf der o.g. Inhalte und Funktionen
        den dortigen Profilen der Nutzer zuordnen. Datenschutzerklärung von
        LinkedIn: https://www.linkedin.com/legal/privacy-policy.. LinkedIn ist
        unter dem Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine
        Garantie, das europäische Datenschutzrecht einzuhalten
        (https://www.privacyshield.gov/participant?id=a2zt0000000L0UZAA0&status=Active).
        Datenschutzerklärung: https://www.linkedin.com/legal/privacy-policy,
        Opt-Out:
        https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Google+:</strong>
        <br />
        <br />
        Innerhalb unseres Onlineangebotes können Funktionen und Inhalte der
        Plattform Google+, angeboten durch die Google Ireland Limited, Gordon
        House, Barrow Street, Dublin 4, Irland („Google“), eingebunden werden.
        Hierzu können z.B. Inhalte wie Bilder, Videos oder Texte und
        Schaltflächen gehören, mit denen Nutzer Inhalte dieses Onlineangebotes
        innerhalb von Google teilen können. Sofern die Nutzer Mitglieder der
        Plattform Google+ sind, kann Google den Aufruf der o.g. Inhalte und
        Funktionen den dortigen Profilen der Nutzer zuordnen.
        <br />
        <br />
        Google ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet
        hierdurch eine Garantie, das europäische Datenschutzrecht einzuhalten
        (https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active).
        Weitere Informationen zur Datennutzung durch Google, Einstellungs- und
        Widerspruchsmöglichkeiten, erfahren Sie in der Datenschutzerklärung von
        Google (https://policies.google.com/technologies/ads) sowie in den
        Einstellungen für die Darstellung von Werbeeinblendungen durch Google
        (https://adssettings.google.com/authenticated).
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Sharing-Funktionen von AddThis:</strong>
        <br />
        <br />
        Innerhalb unseres Onlineangebotes wird der Dienst "AddThis" (1595 Spring
        Hill Rd Suite 300 Vienna, VA 22182, USA) zum Teilen von Inhalten dieses
        Onlineangebotes innerhalb sozialer Netzwerke eingesetzt (sog. Sharing).
        <br />
        <br />
        Die Nutzung erfolgt auf Grundlage unserer berechtigten Interessen, d.h.
        Interesse an einer Verbreitung unseres Onlineangebotes gem. Art. 6 Abs.
        1 lit. f. DSGVO.
        <br />
        <br />
        AddThis nutzt die personenbezogenen Informationen der Nutzer für die
        Zurverfügungstellung und das Ausführen der Sharing-Funktionen. Darüber
        hinaus kann AddThis pseudonyme Informationen der Nutzer zu
        Marketingzwecken nutzen. Diese Daten werden mithilfe von sog.
        "Cookie"-Textdateien auf dem Computer der Nutzer gespeichert.
        Datenschutzerklärung: http://www.addthis.com/privacy, Opt-Out:
        http://www.addthis.com/privacy/opt-out.
        <br />
        <br />
      </Typography>
      <Typography>
        <strong>Shariff-Sharingfunktionen:</strong>
        <br />
        <br />
        Wir verwenden die datenschutzsicheren „Shariff“-Schaltflächen. „Shariff“
        wurde entwickelt, um mehr Privatsphäre im Netz zu ermöglichen und die
        üblichen "Share"-Buttons der sozialen Netzwerke zu ersetzen. Dabei
        stellt nicht der Browser der Nutzer, sondern der Server auf dem sich
        dieses Onlineangebot befindet, eine Verbindung mit dem Server der
        jeweiligen Social-Media-Plattformen her und fragt z.B. die Anzahl von
        Likes, etc. ab. Der Nutzer bleibt hierbei anonym. Mehr Informationen zum
        Shariff-Projekt finden Sie bei den Entwicklern von dem Magazin c't:
        www.ct.de.
        <br />
        <br />
      </Typography>
      <br />
    </Paper>
  )
}

export default PrivacyPolicy
