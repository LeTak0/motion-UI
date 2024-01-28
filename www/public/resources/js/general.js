$(document).ready(function () {
    setInterval(function () {
        getContainerState();
    }, 2000);

    /**
     *  Reload top and bottoms buttons to reload CPU load and unseen events total count
     */
    setInterval(function () {
        reloadContainer('buttons/top');
        reloadContainer('buttons/bottom');
    }, 5000);
});

/**
 *  Event: hide slided window on escape button press
 */
$(document).keyup(function (e) {
    if (e.key === "Escape") {
        closePanel();
    }
});

/**
 *  Slide panel opening
 */
$(document).on('click','.slide-panel-btn',function () {
    var name = $(this).attr('slide-panel');
    openPanel(name);
});

/**
 *  Slide panel closing
 */
$(document).on('click','.slide-panel-close-btn',function () {
    closePanel();
});

/**
 *  Event: mark log as read
 */
$(document).on('click','.acquit-log-btn',function () {
    var id = $(this).attr('log-id');

    acquitLog(id);
});

/**
 *  Reload opened or closed elements that where opened/closed before reloading
 */
function reloadOpenedClosedElements()
{
    /**
     *  Retrieve sessionStorage with key finishing by /opened (<element>/opened)
     */
    var openedElements = Object.keys(sessionStorage).filter(function (key) {
        return key.endsWith('/opened');
    });

    /**
     *  If there are /opened elements set to true, open them
     */
    openedElements.forEach(function (element) {
        if (sessionStorage.getItem(element) == 'true') {
            var element = element.replace('/opened', '');
            $(element).show();
        }
        if (sessionStorage.getItem(element) == 'false') {
            var element = element.replace('/opened', '');
            $(element).hide();
        }
    });
}

/**
 * Ajax: Mark log as read
 * @param {string} id
 */
function acquitLog(id)
{
    $.ajax({
        type: "POST",
        url: "ajax/controller.php",
        data: {
            controller: "general",
            action: "acquitLog",
            id: id
        },
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            jsonValue = jQuery.parseJSON(jqXHR.responseText);
            reloadContainer('header/general-log-messages');
        },
        error : function (jqXHR, textStatus, thrownError) {
            jsonValue = jQuery.parseJSON(jqXHR.responseText);
            printAlert(jsonValue.message, 'error');
        },
    });
}
