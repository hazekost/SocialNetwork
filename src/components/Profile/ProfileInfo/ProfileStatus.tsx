import React from "react";

type ProfileStatusPropsType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })

    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })

    }
    render() {
        return(
            <div>
                {!this.state.editMode && <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>}
                {this.state.editMode && <input autoFocus onBlur={this.deActivateEditMode} value={this.props.status}/>}
            </div>
        )
    }
}