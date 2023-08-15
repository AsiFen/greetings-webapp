export default function greeted_route(greet_instance) {

    async function get_counter(req, res) {
        const users_name = req.params.users_name;

        const count = greet_instance.getValues(users_name);

        res.render('counter', {
            username: users_name,
            userCount: count
        })
    }
    return {
        get_counter,

    }

}