import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IReactReduxProps } from 'types/redux';

import { IAppState } from "reducers";

import { requestLobbies, ILobbyRequestResult, joinLobby, leaveLobby, sendLobbyChatMsg } from 'actions/steamworks';
import { NetworkState } from "types/network";
import { Lobby } from "components/Lobby";

interface IRouteParams {
  lobbyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {
}

interface IConnectedProps {
}

function mapStateToProps(state: IAppState): IConnectedProps {
  return {
  };
}

type PrivateProps = IProps & IConnectedProps & IReactReduxProps;

export class _LobbyPage extends Component<PrivateProps, void> {
  componentDidMount(): void {
    const lobbyId = this.getLobbyId();
    this.props.dispatch(joinLobby(lobbyId));
  }

  componentWillUnmount(): void {
    const lobbyId = this.getLobbyId();
    this.props.dispatch(leaveLobby(lobbyId));
  }

  private getLobbyId(): string {
    const { match } = this.props;
    const lobbyId = match.params.lobbyId;
    return lobbyId;
  }

  render() {
    console.log('LOBBY PAGE', this.props);

    return (
      <Lobby name={this.getLobbyId()}
        sendMessage={this.sendMessage} />
    );
  }

  private sendMessage = (msg: string) => {
    const lobbyId = this.getLobbyId();
    this.props.dispatch(sendLobbyChatMsg(lobbyId, msg));
  };
}

export const LobbyPage = connect<IConnectedProps, {}, IProps>(mapStateToProps)(_LobbyPage);