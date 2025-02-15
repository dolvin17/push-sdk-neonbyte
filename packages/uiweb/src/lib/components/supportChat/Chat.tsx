import React, { useEffect, useState } from 'react';
import { ChatIcon } from '../../icons/ChatIcon';
import { Modal } from './Modal';
import styled from 'styled-components';
import { handleOnChatIconClick } from '../../helpers';
import {
  SupportChatMainStateContext,
  SupportChatPropsContext,
} from '../../context';
import type { IMessageIPFS, ITheme, SignerType } from '../../types';
import './index.css';
import type { ENV} from '../../config';
import { Constants, lightTheme } from '../../config';
import { useSDKSocket } from '../../hooks/useSDKSocket';
import { Div } from '../reusables/sharedStyling';
import { getAddressFromSigner } from '../../helpers';
export type ChatProps = {
account?: string;
  signer: SignerType;
  supportAddress: string;
  greetingMsg?: string;
  modalTitle?: string;
  theme?: ITheme;
  apiKey?: string;
  env?: ENV;
};

export type ButtonStyleProps = {
  bgColor: string;
};

 export const Chat: React.FC<ChatProps> = ({
 account = null,
  signer = null,
  supportAddress,
  greetingMsg = Constants.DEFAULT_GREETING_MSG,
  modalTitle = Constants.DEFAULT_TITLE,
  theme = { ...lightTheme },
  apiKey = '',
  env = Constants.ENV.PROD,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [connectedUser, setConnectedUser] = useState<any>(null);
  const [messageBeingSent, setMessageBeingSent] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'error' | 'success'>();
  const [chats, setChats] = useState<IMessageIPFS[]>([]);
  const [accountadd, setAccount] = useState<string | null>(account)
  const setChatsSorted = (chats: IMessageIPFS[]) => {
    const uniqueChats = [
      ...new Map(chats.map((item) => [item['timestamp'], item])).values(),
    ];

    uniqueChats.sort((a, b) => {
      return a.timestamp! > b.timestamp! ? 1 : -1;
    });
    setChats(uniqueChats);
  };
  const socketData = useSDKSocket({
    account: account,
    env,
    apiKey,
  });

  const chatPropsData = {
    account : accountadd,
    signer,
    supportAddress,
    greetingMsg,
    modalTitle,
    theme: { ...lightTheme, ...theme },
    apiKey,
    env,
  };

  useEffect(() => {
    (async () => {
      if(signer) {
        if (!account) {
          const address = await getAddressFromSigner(signer);
          setAccount(address);
        }
        else{
          setAccount(account);
        }
     
    }
    })();
  },[signer])

  useEffect(() => {
    setChats([]);
    setConnectedUser(null);
  }, [account, supportAddress]);

  const chatMainStateData = {
    isModalOpen,
    socketData,
    setIsModalOpen,
    connectedUser,
    setConnectedUser,
    messageBeingSent,
    setMessageBeingSent,
    setToastMessage,
    setToastType,
    message,
    setMessage,
    chats,
    setChatsSorted,
    toastMessage,
    toastType,
  };

  return (
    <Container>
      <SupportChatPropsContext.Provider value={chatPropsData}>
        <SupportChatMainStateContext.Provider value={chatMainStateData}>
          {!isModalOpen && (
            <Button
              bgColor={theme.btnColorPrimary!}
              onClick={() =>
                handleOnChatIconClick({ isModalOpen, setIsModalOpen })
              }
            >
              <Div cursor='pointer'>
                <ChatIcon />
              </Div>
            </Button>
          )}
          {isModalOpen && <Modal />}
        </SupportChatMainStateContext.Provider>
      </SupportChatPropsContext.Provider>
    </Container>
  );
};

//styles

const Container = styled.div`
  font-family: 'Strawford';
  flex: 1;
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  width: fit-content;
  margin: 0 3rem 2rem 0;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button<ButtonStyleProps>`
  background: ${(props) => props.bgColor};
  border: none;
  cursor: pointer;
  border-radius: 18px;
  padding: 16.5px 16.5px 13px 18.5px;
`;

const Image = styled.img``;
