$(document).ready(function(){


    // Load in the clips and place them in the document
    $.getJSON('clips.json', function(clips) {
        //clips is the JSON string
        clipdiv = $("#clips")

        usedIndices = new Set()

        for (i=0; i < clips.length; i++) {
            usedIndices.add(clips[i]["index"])
            console.log("Added "+clips[i]["index"])
            clipdiv.append("<div class=\"clip text-center\">Clip "+(i+1)+": <audio controls><source src=\""+clips[i]["file"]+"\" type=\"audio/mp3\"></audio> <span class=\"answerlabel\">Answer:</span> <select class=\"answers\"></select></div>")
        }

        
        


        $.getJSON('suggestions.json', function(suggestions) {

            allanswers = $(".answers")

            allanswers.append("<option value=\"\"></option>")

            for (i=0; i < suggestions.length; i++) {
                if (usedIndices.has(parseInt(suggestions[i]["index"]))) {
                    allanswers.append("<option value=\""+suggestions[i]["index"]+"\">"+suggestions[i]["name"]+"</option>")
                }
            }
            
            allanswers.select2({width: "10em"})
        });
    

    });


    // Make the answers button work
    $("#answercheck").click( function() {
        $("#fadediv").show();
        answers = $(".answers");

        $.getJSON('clips.json', function(clips) {
            //clips is the JSON string
            clipdiv = $("#clips")
            answerlabels = $(".answerlabel")
    
            score = 0;

            for (i=0; i < clips.length; i++) {
                answer = answers.eq(i).val()
                if (answer == clips[i]["index"]) {
                    answerlabels.eq(i).removeClass("wrong")
                    answerlabels.eq(i).addClass("correct")
                    score += 1
                }
                else {
                    answerlabels.eq(i).removeClass("correct")
                    answerlabels.eq(i).addClass("wrong")

                }
            }

            // Set the colours and scores
            if (score < 5) {
                $("#answerdiv").css("background-color","red")
                $("#sarkycomment").text("Maybe you should pay more attention at the start?")
            }
            else if (score < 14) {
                $("#answerdiv").css("background-color","orange")
                $("#sarkycomment").text("Not bad, but maybe spare a bit more love for the band.")
            }
            else {
                $("#answerdiv").css("background-color","green")
                $("#sarkycomment").text("You are truly a musicals geek.")

            }

            $("#finalscore").text(score)

            $("#answerdiv").slideDown();
        });
    });

    // Let them try again if they want to alter their answers
    $('#changeanswers').click (function() {
        $('#answerdiv').slideUp();
        $("#fadediv").fadeOut();
    })

    // Reset everything when they opt to play again
    $('#playagain').click (function() {

        answers = $(".answers");
        $('#answerdiv').slideUp();
        $("#fadediv").fadeOut();
        window.scrollTo(0, 0);

        setTimeout(location.reload.bind(location), 500);
    })

  }); 