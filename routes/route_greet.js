export default function greeted_route(greet_instance) {

    async function get_names(req, res) {
        try {
            res.render('greeted', {
                usernames: greet_instance.getNames()
            })
            // res.redirect('/')
        }

        catch (error) {
            console.log('Error generating greeting', error)
        }
    }

    async function showGreeting(req, res) {
        greet_instance.makeGreet(req.body.nameInput, req.body.language);
        const errorMessages = greet_instance.errors(req.body.nameInput, req.body.language);
        req.flash('errorDisplay', errorMessages);
        //redirects you to the home route when done sending in parameters
        res.redirect('/');
    }

    return {
        showGreeting,
        get_names

    }
}