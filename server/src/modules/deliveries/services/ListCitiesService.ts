import { Search } from 'sonic-channel';

interface IRequest {
  query: string;
}

export default class ListCitiesService {
  public async execute({ query }: IRequest): Promise<string[]> {
    const sonicChannelSearch = new Search({
      host: 'localhost',
      port: 1491,
      auth: 'SecretPassword',
    });

    sonicChannelSearch.connect({
      connected: () => {
        console.log('Sonic connected');
      },
    });

    const results = await sonicChannelSearch.query('cities', 'default', query, {
      lang: 'por',
    });

    return results.map(city => city.split('_').join(' '));
  }
}
