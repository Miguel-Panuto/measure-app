import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { useHistory, Link } from 'react-router-dom'; //TODO use to go back
import { min, max, average } from '../../utils/calc';

import {
  Container,
  Button,
  ButtonContainer,
  UsagesContainer,
  Usage,
} from './styles';
import api from '../../services/api';

interface UsageNode {
  isActive: boolean;
  numbers: [number] | null;
}

interface StrNode {
  isActive: boolean;
  storages: {
    mount: string,
    usages: [number]
  }[];
}

const DataPage: React.FC = () => {
  const history = useHistory();
  const [id, setId] = useState<number | null>();
  const [modelCpu, setModel] = useState<string | null>();
  const [speedCpu, setSpeed] = useState<string | null>();
  const [cpus, setCpus] = useState<UsageNode>({
    isActive: false,
    numbers: null,
  });
  const [ram, setRam] = useState<UsageNode>({ isActive: false, numbers: null });
  const [str, setStr] = useState<StrNode>({ isActive: false, storages: [] });

  useEffect(() => {
    if (!localStorage.getItem('id')) history.push('/');
    setId((localStorage.getItem('id') as unknown) as number);
    verifyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyId = () => {
    api
      .get('/', {
        headers: {
          id: localStorage.getItem('id'),
        },
      })
      .then((res) => console.log(res.data))
      .catch(() => {
        alert('Invalid ID');
        return history.push('/');
      });
  };

  const activeCpus = () => {
    if (cpus.numbers?.length)
      return setCpus({
        isActive: !cpus.isActive,
        numbers: cpus.numbers,
      });
    if (!cpus.numbers?.length)
      api.get('/cpu', { headers: { id } }).then(({ data }) => {
        const { model, speed, usages } = data;
        setModel(model);
        setSpeed(speed);
        setCpus({
          isActive: true,
          numbers: (usages.map((usage: any) => usage.usage) as unknown) as [
            number
          ],
        });
      });
  };

  const activeRam = () => {
    if (ram.numbers?.length)
      return setRam({
        isActive: !ram.isActive,
        numbers: ram.numbers,
      });
    if (!ram.numbers?.length)
      api.get('/ram', { headers: { id } }).then(({ data }) => {
        
        setRam({
          isActive: true,
          numbers: data.map((u: any) => u.usage)
        })
      });
  };

  const activeStr = () => {
    if (str.storages?.length)
      return setStr({
        isActive: !str.isActive,
        storages: str.storages,
      });
    if (!str.storages?.length)
      api.get('/strg', { headers: { id } }).then(({ data }) => {
        let strgs: {mount: string, usages: [number]}[] = [];
        data.map((us :any) => {
            if(strgs.length <= 0||!strgs.find(el => el.mount === us.mount)) {
              const nums = data.filter((usa: any) => usa.mount === us.mount)
                .map((el:any) => el.usage);
              return strgs.push({ mount: us.mount, usages: nums })
            }
            return null;
          });
        setStr({ isActive: true, storages: strgs });
      });
  };

  return (
    <Container>
      <Link to='/'>Go back</Link>
      <ButtonContainer>
        <Button isActivated={cpus.isActive} onClick={activeCpus}>
          CPU
        </Button>
        <Button isActivated={ram.isActive} onClick={activeRam}>
          RAM
        </Button>
        <Button isActivated={str.isActive} onClick={activeStr}>Storage</Button>
      </ButtonContainer>
      <UsagesContainer>
        {cpus.isActive ? (
          <Usage>
            <h2>{modelCpu}</h2>
            <h3>{speedCpu}</h3>
            <span>
              Lowest: {min(cpus.numbers as unknown as [number]).toFixed(2)} %
            </span>
            <span>
              Highest: {max(cpus.numbers as unknown as [number]).toFixed(2)} %
            </span>
            <span>
              Avarage: {average(cpus.numbers as unknown as [number]).toFixed(2)} %
            </span>
          </Usage>
        ) : null}
        {ram.isActive ? (
          <Usage>
            <h2>RAM</h2>
            <span>
              Lowest: {min(ram.numbers as unknown as [number]).toFixed(2)} %
            </span>
            <span>
              Highest: {max(ram.numbers as unknown as [number]).toFixed(2)} %
            </span>
            <span>
              Avarage: {average(ram.numbers as unknown as [number]).toFixed(2)} %
            </span>
          </Usage>
        ) : null}
        {str.isActive? (
          <Usage>
            <h2>Storage</h2>
            {str.storages?.map(us => (
              <>
                <h3 key={us.mount}>{us.mount}</h3>
                <span key={us.mount + 1}>{average(us.usages).toFixed(2)} %</span>
              </>
            ))}
          </Usage>
        ): null}
      </UsagesContainer>
    </Container>
  );
};

export default DataPage;
