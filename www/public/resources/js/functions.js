
function openPanel(name)
{
    $('.slide-panel-container[slide-panel=' + name + ']').css({
        visibility: 'visible'
    }).promise().done(function () {
        $('.slide-panel-container[slide-panel=' + name + ']').find('.slide-panel').animate({
            right: '0'
        })
    })
}

function closePanel()
{
    $('.slide-panel').animate({
        right: '-1000px',
    }).promise().done(function () {
        $('.slide-panel-container').css({
            visibility: 'hidden'
        })
    })
}

/**
 *  Print alert or error message
 *  @param {string} message
 *  @param {string} type
 *  @param {int} timeout
 */
function printAlert(message, type = null, timeout = 2500)
{
    $('#newalert').remove();

    if (type == "error") {
        $('footer').append('<div id="newalert" class="alert-error"><div>' + message + '</div></div>');
    }
    if (type == "success") {
        $('footer').append('<div id="newalert" class="alert-success"><div>' + message + '</div></div>');
    }

    if (timeout != 'none') {
        window.setTimeout(function () {
            $('#newalert').fadeTo(1000, 0).slideUp(1000, function () {
                $('#newalert').remove();
            });
        }, timeout);
    }
}

/**
 * Print a confirm alert box before executing specified function
 * @param {*} message
 * @param {*} myfunction1
 * @param {*} confirmBox1
 */
function confirmBox(message, myfunction1, confirmBox1 = 'Delete', myfunction2 = null, confirmBox2 = null)
{
    /**
     *  First, delete all active confirm box if any
     */
    $("#newConfirmAlert").remove();

    /**
     *  Wait 50ms before creating new confirm box
     */
    setTimeout(function () {
        /**
         *  Case there is three choices
         */
        if (myfunction2 != null && confirmBox2 != null) {
            var $content = '<div id="newConfirmAlert" class="confirmAlert"><span></span><span>' + message + '</span><div class="confirmAlert-buttons-container"><span class="pointer btn-doConfirm1">' + confirmBox1 + '</span><span class="pointer btn-doConfirm2">' + confirmBox2 + '</span><span class="pointer btn-doCancel">Cancel</span></div></div>';
        /**
         *  Case there is two choices
         */
        } else {
            var $content = '<div id="newConfirmAlert" class="confirmAlert"><span></span><span>' + message + '</span><div class="confirmAlert-buttons-container"><span class="pointer btn-doConfirm1">' + confirmBox1 + '</span><span class="pointer btn-doCancel">Cancel</span></div></div>';
        }

        $('footer').append($content);

        /**
         *  If choice one is clicked
         */
        $('.btn-doConfirm1').click(function () {
            /**
             *  Execute function 1
             */
            myfunction1();

            /**
             *  Then remove alert
             */
            $("#newConfirmAlert").slideToggle(0, function () {
                $("#newConfirmAlert").remove();
            });
        });

        /**
         *  If choice two is clicked
         */
        $('.btn-doConfirm2').click(function () {
            /**
             *  Execute function 2
             */
            myfunction2();

            /**
             *  Then remove alert
             */
            $("#newConfirmAlert").slideToggle(0, function () {
                $("#newConfirmAlert").remove();
            });
        });

        /**
         *  If 'cancel' choice is clicked
         */
        $('.btn-doCancel').click(function () {
            /**
             *  Remove alert
             */
            $("#newConfirmAlert").slideToggle(0, function () {
                $("#newConfirmAlert").remove();
            });
        });
    }, 50);
}


/**
 *  Reload content of an element, by its Id
 *  @param {string} id
 */
function reloadContentById(id)
{
    $('#' + id).load(location.href + ' #' + id + ' > *');
}

/**
 * Reload content of an element, by its class
 * @param {*} className
 */
function reloadContentByClass(className)
{
    $('.' + className).load(location.href + ' .' + className + ' > *');
}

/**
 *  Get specified cookie value
 *  @param {*} name
 */
function getCookie(name)
{
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}

/**
 * Set cookie value
 * @param {*} cname
 * @param {*} cvalue
 * @param {*} exdays
 */
function setCookie(cname, cvalue, exdays)
{
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure";
}

function reloadPanel(panel)
{
    $(".slide-panel-reloadable-div[slide-panel='" + panel + "']").load(location.href + " .slide-panel-reloadable-div[slide-panel='" + panel + "'] > *");
}

/**
 * Ajax: Get and reload container
 * @param {*} container
 */
function reloadContainer(container)
{
    $.ajax({
        type: "POST",
        url: "ajax/controller.php",
        data: {
            controller: "general",
            action: "getContainer",
            container: container
        },
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            jsonValue = jQuery.parseJSON(jqXHR.responseText);
            /**
             *  Replace container with itself, with new content
             */
            $('.reloadable-container[container="' + container + '"]').replaceWith(jsonValue.message);
        },
        error : function (jqXHR, textStatus, thrownError) {
            jsonValue = jQuery.parseJSON(jqXHR.responseText);
            printAlert(jsonValue.message, 'error');
        },
    });
}

/**
 *  Ajax: Get all containers state and reload them if needed
 */
function getContainerState()
{
    $.ajax({
        type: "POST",
        url: "ajax/controller.php",
        data: {
            controller: "general",
            action: "getContainerState"
        },
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            /**
             *  Parse results and compare with current state
             */
            jsonValue = jQuery.parseJSON(jqXHR.responseText);
            containersArray = jQuery.parseJSON(jsonValue.message);
            containersArray.forEach(obj => {
                Object.entries(obj).forEach(([key, value]) => {
                    if (key == 'Container') {
                        containerName = value;
                    }
                    if (key == 'Id') {
                        containerStateId = value;
                    }
                });
                /**
                 *  If current container does not appear in cookies yet, add it
                 */
            if (getCookie(containerName) == "") {
                setCookie(containerName, containerStateId, 365);
                /**
                 *  Else compare current state with cookie state
                 */
            } else {
                var cookieState = getCookie(containerName);

                /**
                 *  If state has changed, reload container and update cookie
                 */
                if (cookieState != containerStateId) {
                    setCookie(containerName, containerStateId, 365);
                    reloadContainer(containerName);
                }
            }
            });
        },
        error : function (jqXHR, textStatus, thrownError) {
            jsonValue = jQuery.parseJSON(jqXHR.responseText);
            printAlert(jsonValue.message, 'error');
        },
    });
}