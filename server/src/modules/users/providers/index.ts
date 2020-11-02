import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashprovider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
