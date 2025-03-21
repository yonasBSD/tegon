import { Button } from '@tegonhq/ui/components/button';
import { Filter } from '@tegonhq/ui/icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { SCOPES } from 'common/scopes';
import { TooltipWrapper } from 'common/wrappers/tooltip-wrapper';

import { useContextStore } from 'store/global-context-provider';

import { isEmpty } from './filter-utils';
import { Filters } from './filters';

interface FilterViewProps {
  Actions?: React.ReactElement;
}

export const FiltersView = observer(({ Actions }: FilterViewProps) => {
  const {
    applicationStore,
    applicationStore: { filters },
  } = useContextStore();
  const [filtersShow, setFiltersShow] = React.useState(!isEmpty(filters));

  React.useEffect(() => {
    if (!isEmpty(filters)) {
      setFiltersShow(true);
    }
  }, [filters]);

  const onClose = () => {
    applicationStore.clearFilters();
    setFiltersShow(false);
  };

  // Shortcuts
  useHotkeys(
    ['f'],
    () => {
      setFiltersShow(true);
    },
    {
      scopes: [SCOPES.AllIssues],
      preventDefault: !filtersShow,
    },
    [filtersShow],
  );

  return (
    <div className="px-4 py-2 pt-2 pr-2 flex flex-col gap-2">
      <div className="flex justify-between">
        <TooltipWrapper tooltip="Filter Issues (F)">
          <Button
            variant="secondary"
            isActive={filtersShow}
            onClick={() => setFiltersShow(true)}
          >
            <Filter size={16} className="mr-1" />
            Filter
          </Button>
        </TooltipWrapper>

        <div>{Actions}</div>
      </div>

      {filtersShow && (
        <div className="flex justify-start w-full">
          <Filters onClose={onClose} />
        </div>
      )}
    </div>
  );
});
