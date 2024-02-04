const app = require('./index')

const port = process.env.PORT || 3010;

app.listen(port, () => {
    console.log(`server start on ${port}`)
});
