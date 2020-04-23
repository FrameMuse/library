// Enhacements

class api extends Sneekers.domestic.api {
    static success(closure, result) {
        if (page.dev) {
            //page.support.notify_dev("success", result);
            console.warn(result);
            return;
        }

        if ("error" in result) {
            //page.support.notify("error", getLanguage(result.error_msg))
            return;
        } else closure(result);
    }
}

class page extends Sneekers.local.pages {
    constructor(config) {
        this.__addPage(config);
    }
}

// Pages

new page({
    name: "/home",
    onSuccess: function () {

    },
    errors: {
        404: Sneekers.exception.DefaultError(404),
    },
});

// Try & Catch

try {
    
} catch (error) {
    Sneekers.exception.catch(error);
}

Sneekers.exception.try(function () {

}, Sneekers.exception.catch);


api.send("/profile/load/page/1/0", {
    id: 1,
})  
.get(function () {
    
}); 

api.get([
    {
        url: "/referal/save_promo",
        data: {},
        onSuccess: function () {

        },
    }
]);

