import { 
    React,
    Component
} from 'react';

import { 
    Text,
    TouchableOpacity
 } from 'react-native';

import { styles } from '../styles/styles.js'

export default class TextButton extends Component {

    render() {
        return (
        <TouchableOpacity onPress={ this.props.onPress } style={ styles.button }> 
            <Text style={ styles.buttonText }>{ this.props.text }</Text>
        </TouchableOpacity>
        )
    }
}
