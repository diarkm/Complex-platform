import { Component } from "react";

export default class PostLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded:false,
            items = []
        }
    }

    componentDidMount(){
        fetch("http://79.143.31.221/user/login")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <p> Error {error.message} </p>
        } else if (!isLoaded) {
            return <p> Loading... </p>
        } else {
            
        }
    }

}