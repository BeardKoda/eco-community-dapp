import { Column, Typography } from "@ecoinc/ecomponents";
import { css } from "@emotion/react";
import {
  AccountActivity,
  AccountActivityType,
} from "../../../../queries/ACCOUNT_ACTIVITY_QUERY";
import { formatTime } from "../../../../utilities";

const dateTime = css({
  fontSize: "10px",
  lineHeight: "12px",
});

interface AccountActivityItemProps {
  activity: AccountActivity;
}

interface CardBaseProps {
  time: Date;
}

interface ProposalActivityProps {
  action: string;
  proposalName: string;
  bridge?: string;
}

const CardBase: React.FC<React.PropsWithChildren<CardBaseProps>> = ({
  time,
  children,
}) => {
  return (
    <Column css={{ marginBottom: "24px" }}>
      <Typography variant="body3" color="secondary" css={dateTime}>
        {time ? formatTime(time).toUpperCase() : null}
      </Typography>
      <Typography variant="body1">{children}</Typography>
    </Column>
  );
};

const ProposalActivity: React.FC<ProposalActivityProps> = ({
  action,
  proposalName,
  bridge,
}) => {
  return (
    <Typography variant="body1">
      You <b>{action}</b> {bridge} proposal: <i>{proposalName}</i>
    </Typography>
  );
};

const AccountActivityItem: React.FC<AccountActivityItemProps> = ({
  activity,
}) => {
  if (activity.type === AccountActivityType.SECOX_UNDELEGATE) {
    return <CardBase time={activity.timestamp}>sECOx undelegated</CardBase>;
  }
  if (activity.type === AccountActivityType.SECOX_DELEGATE) {
    return <CardBase time={activity.timestamp}>sEcox delegated</CardBase>;
  }
  if (activity.type === AccountActivityType.ECO_UNDELEGATE) {
    return <CardBase time={activity.timestamp}>Eco Undelegated</CardBase>;
  }
  if (activity.type === AccountActivityType.ECO_DELEGATE) {
    return <CardBase time={activity.timestamp}>Eco Delegated</CardBase>;
  }
  if (activity.type === AccountActivityType.LOCKUP_DEPOSIT) {
    return <CardBase time={activity.timestamp}>Lockup Deposit</CardBase>;
  }
  if (activity.type === AccountActivityType.PROPOSAL_VOTED_AGAINST) {
    return (
      <CardBase time={activity.timestamp}>
        <ProposalActivity
          action="voted against"
          proposalName={activity.communityProposal.name}
        />
      </CardBase>
    );
  }
  if (activity.type === AccountActivityType.PROPOSAL_VOTED_FOR) {
    return (
      <CardBase time={activity.timestamp}>
        <ProposalActivity
          action="voted"
          bridge="for"
          proposalName={activity.communityProposal.name}
        />
      </CardBase>
    );
  }
  if (activity.type === AccountActivityType.PROPOSAL_UNSUPPORTED) {
    return (
      <CardBase time={activity.timestamp}>
        <ProposalActivity
          action="revoked support"
          bridge="for"
          proposalName={activity.communityProposal.name}
        />
      </CardBase>
    );
  }
  if (activity.type === AccountActivityType.PROPOSAL_SUPPORTED) {
    return (
      <CardBase time={activity.timestamp}>
        <ProposalActivity
          action="gave support"
          bridge="to"
          proposalName={activity.communityProposal.name}
        />
      </CardBase>
    );
  }
  if (activity.type === AccountActivityType.PROPOSAL_REFUNDED) {
    return <CardBase time={activity.timestamp}>proposal refunded</CardBase>;
  }
  if (activity.type === AccountActivityType.PROPOSAL_SUBMITTED) {
    return (
      <CardBase time={activity.timestamp}>
        <ProposalActivity
          action="deployed"
          bridge="a"
          proposalName={activity.communityProposal.name}
        />
      </CardBase>
    );
  }
};

export default AccountActivityItem;
