import PropTypes from 'prop-types';
import { Progress, Tooltip } from '@nextui-org/react';
import { pokemonStatsConfig } from '../../../utils/constants';

const Stats = ({ stats = [] }) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {stats.map((stat, index) => {
        const {
          stat: { name },
          base_stat,
        } = stat;
        return (
          <Tooltip key={index} content={base_stat} placement="left">
            <Progress
              value={base_stat}
              color={pokemonStatsConfig[name]}
              aria-label={name}
              label={name.toUpperCase()}
            />
          </Tooltip>
        );
      })}
    </div>
  );
};

Stats.propTypes = {
  stats: PropTypes.array,
};

export default Stats;
