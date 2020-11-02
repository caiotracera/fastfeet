interface IMailConfig {
  driver: 'ethereal' | 'ses';
  default: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.APP_MAIL_DRIVER || 'ethereal',
  default: {
    from: {
      email: 'contato@fastfeet.com.br',
      name: 'Caio | FastFeet',
    },
  },
} as IMailConfig;
