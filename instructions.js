
const WELCOME_INSTRUCTION = `
<h1>
    Beste deelnemer,
</h1>
<h2>
    Welkom bij het experiment ‘Gekleurde Woorden’.
</h1>
<p>
    Eerst zal je wat informatie zien over het experiment en
    welke gegevens we zullen verzamelen.<br>Je kan dan aangeven
    of je akkoord gaat met het formulier van geinformeerde toestemmng
    of dat je niet akkoord gaat,<br>in het laatste geval wordt geen data 
    verzameld en het experiment zal dan direct stoppen.
</p>
<p>
    Dan krijg je een korte vragenlijst. Na de vragen 
    krijg je extra instructies over hoe het experiment
    wordt afgenomen.
</p>
<p>
    Druk op de spatiebalk om door te gaan.
</p>`;

const PRE_PRACTICE_INSTRUCTION1 =
    "<h1>"                                                              +
        "Vervolg instructies."                                          +
    "</h1>"                                                             +
    "<p>"                                                               +
        "Je krijgt zo meteen een reeks woorden te zien "                +
        "op het computerscherm. Deze woorden kunnen in het "            +
        "rood, geel, groen of blauw op het scherm verschijnen. "        +
        "Als je een woord ziet, gaat het erom dat je zo "               +
        "snel mogelijk de kleur van het woord benoemt via "             +
        "een druk op een toets. Het gaat in dit experiment "            +
        "dus niet om de betekenis van het woord, maar slechts "         +
        "om de kleur. Telkens als je de kleur hebt benoemd, "           +
        "krijg je het volgende woord te zien. "                         +
    "</p>"                                                              +
    "<p>"                                                               +
        "Klik op de spatiebalk om door "                                +
        "te gaan naar de volgende pagina."                              +
    "</p>";

// Is setup in setupInstructions below.
let key_instruction = undefined;

/**
 * Returns the instruction about the desired responsekey for a 
 * font color
 *
 * Return {string} a number of lines with a break on the end. 
 */

function colorResponseTable() {

    let instruction = "";

    function responseString(response_key) {
        for (const color in correct_responses) {
            if (correct_responses[color] === response_key) {
                let tcolor = COL_TRANS[color];
                return `De toets <b>${response_key}</b> staat voor ${tcolor}`;
            }
        }
        console.error(`unhandeled key ${response_key}`);
        return null;
    }

    for (let i = 0; i < RESPONSE_KEYS.length; i++) {
        instruction += responseString(RESPONSE_KEYS[i]);
        if (i < RESPONSE_KEYS.length - 1) {
            instruction += ",";
            instruction += "<br>";
        }
        else {
            instruction += '.';
        }
    }
    return instruction;
}


/**
 * Sets up the right instructions for the desired keys in the experiment.
 */
function setupInstructions()
{

    
    let instruction = `<p>
        Om de kleur van een woord te benoemen, druk je op een toets. 
        Je gebruikt de toetsen 1, 2, 9 en 0.
    </p>
    <p>`;

    instruction += colorResponseTable();

    instruction += `\n</p>
    <p>
        Druk op de spatiebalk om verder te gaan.
    </p>`;
    key_instruction = instruction;
}

const PRE_PRACTICE_INSTRUCTION3 =
    "<p>"                                                               +
        "Je gebruikt je wijs- en middelvinger "                         +
        "van beide handen om de toetsen in te drukken. "                +
        "Het is de bedoeling dat je deze vingers "                      +
        "gedurende het hele experiment op "                             +
        "de toetsen houdt. "                                            +
        "Natuurlijk kun je tussendoor wel "                             +
        "even verzitten en bewegen. "                                   +
    "</p>"                                                              +
    "<p>"                                                               +
        "Geef je antwoord zo snel mogelijk, maar het "                  +
        "is ook belangrijk om het juiste antwoord te geven."            +
    "</p>"                                                              +
    "<p>"                                                               +
        "Druk op de spatie balk om verder te gaan."                     +
    "</p>";

const PRE_TEST_INSTRUCTION = 
    "<p>"                                                               +
        "Einde van het oefen gedeelte."                                 +
    "</p>"                                                              +
    "<p>"                                                               +
        "<i>Druk op de spatiebalk om door te gaan.</i>"                 + 
    "</p>";

const PREPARE_INSTRUCTION =
    "<h2>Zet je vingers klaar op de knoppen de taak begint</h2>";


const POST_TEST_INSTRUCTION =
    "<h1>Einde van het experiment</h1>"                                 +
    "<h2>Hartelijk bedankt voor het meedoen!</h2>";

const FINISHED_NO_CONSENT = 
    "<h1>Het experient gaat niet door omdat je niet akkoord ben gegaan " +
    "met het geïnformeerde toestemmingsformulier</h1>"                   +
    "<p>Je kan dit tabblad sluiten.</p>";

