export default {
  translation: {
    chat: {
      channels: 'Каналы',
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
      labels: {
        channelControl: 'Управление каналом',
      },
    },
    forms: {
      logInForm: {
        title: 'Войти',
        fields: {
          username: 'Ваш ник',
          password: 'Пароль',
        },
        errors: {
          invalidLoginAttempt: 'Неверные имя пользователя или пароль',
        },
      },
      signUpForm: {
        title: 'Регистрация',
        fields: {
          username: 'Имя пользователя',
          password: 'Пароль',
          confirmPassword: 'Подтвердите пароль',
        },
        errors: {
          requiredFiled: 'Обязательное поле',
          usernameLengthLimit: 'От 3 до 20 символов',
          passwordLengthLimit: 'Не менее 6 символов',
          passwordDoesNotMatch: 'Пароли должны совпадать',
          userAlreadyExists: 'Такой пользователь уже существует',
        },
      },
      messageForm: {
        labels: {
          newMessage: 'Новое сообщение',
        },
        fields: {
          enterMessage: 'Введите сообщение...',
        },
      },
      editChannelForm: {
        labels: {
          channelName: 'Имя канала',
        },
        errors: {
          channelnameLengthLimit: 'От 3 до 20 символов',
          mustBeUnique: 'Должно быть уникальным',
          requiredFiled: 'Обязательное поле',
        }
      },
      createChannelForm: {
        labels: {
          channelName: 'Имя канала',
        },
        errors: {
          channelnameLengthLimit: 'От 3 до 20 символов',
          mustBeUnique: 'Должно быть уникальным',
          requiredFiled: 'Обязательное поле',
        }
      }
    },
    modals: {
      editChannelModal: {
        title: 'Переименовать канал',
      },
      deleteChannelModal: {
        title: 'Удалить канал',
        body: 'Уверены?',
      },
      createChannelModal: {
        title: 'Добавить канал',
      },
    },
    buttons: {
      login: 'Войти',
      signUp: 'Зарегистрироваться',
      logout: 'Выйти',
      cancel: 'Отменить',
      delete: 'Удалить',
      rename: 'Переименовать',
      send: 'Отправить',
    },
    notifications: {
      channelSuccessfullyDeleted: 'Канал удалён',
      channelSuccessfullyRenamed: 'Канал переименован',
      channelSuccessfullyCreated: 'Канал создан',
      connectionError: 'Ошибка соединения',
    },
    cards: {
      logInCard: {
        noAccount: 'Нет аккаунта?',
        register: 'Регистрация',
      },
    },
  },
};