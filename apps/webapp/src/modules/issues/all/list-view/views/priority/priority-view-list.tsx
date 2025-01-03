import { Button } from '@tegonhq/ui/components/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@tegonhq/ui/components/collapsible';
import { AddLine, ChevronDown, ChevronRight } from '@tegonhq/ui/icons';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { IssueListItem } from 'modules/issues/components';
import { PriorityIcons } from 'modules/issues/components';
import { useNewIssue } from 'modules/issues/new-issue';

import { type IssueType } from 'common/types';

import { useCycle } from 'hooks/cycles';
import { usePriorities } from 'hooks/priorities';
import { useProject } from 'hooks/projects';
import { useCurrentTeam } from 'hooks/teams';
import { useComputedWorkflows } from 'hooks/workflows';

import { useContextStore } from 'store/global-context-provider';

import { useFilterIssues } from '../../../../issues-utils';

interface PriorityViewListProps {
  priority: number;
}

export const PriorityViewList = observer(
  ({ priority }: PriorityViewListProps) => {
    const { issuesStore, applicationStore } = useContextStore();
    const [isOpen, setIsOpen] = React.useState(true);
    const { workflows } = useComputedWorkflows();
    const project = useProject();
    const { openNewIssue } = useNewIssue();
    const cycle = useCycle();
    const team = useCurrentTeam();

    const issues = issuesStore.getIssuesForPriority(priority, {
      teamId: team?.id,
      projectId: project?.id,
      cycleId: cycle?.id,
    });
    const computedIssues = useFilterIssues(issues, workflows);
    const Priorities = usePriorities();

    if (
      computedIssues.length === 0 &&
      !applicationStore.displaySettings.showEmptyGroups
    ) {
      return null;
    }

    const PriorityIcon = PriorityIcons[priority];

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-1 items-center">
          <CollapsibleTrigger asChild>
            <Button
              className="flex group items-center ml-4 w-fit rounded-2xl bg-grayAlpha-100"
              variant="ghost"
              size="lg"
            >
              <PriorityIcon.icon size={20} className="group-hover:hidden" />
              <div className="hidden group-hover:block">
                {isOpen ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </div>
              <h3 className="pl-2">{Priorities[priority]}</h3>
            </Button>
          </CollapsibleTrigger>

          <div className="rounded-2xl bg-grayAlpha-100 p-1.5 px-2 font-mono">
            {computedIssues.length}
          </div>

          <Button variant="ghost" onClick={() => openNewIssue({ priority })}>
            <AddLine size={14} />
          </Button>
        </div>

        <CollapsibleContent>
          {computedIssues.map((issue: IssueType) => (
            <IssueListItem key={issue.id} issueId={issue.id} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  },
);
