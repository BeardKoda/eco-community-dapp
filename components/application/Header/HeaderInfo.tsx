import { Column, Row } from "@ecoinc/ecomponents";
import { MonoText } from "../commons/MonoText";
import { Countdown } from "../Countdown";
import { GenerationStage, Stage } from "../../../types";
import React from "react";
import {
  isSubmittingInProgress,
  isVotingInProgress,
} from "../../../providers/CommunityProvider";
import { useTimeFlag } from "../../hooks/useTimeFlag";

interface HeaderInfoProps {
  stage?: Stage["name"];
  endsAt?: Date;
  nextGenStartsAt: Date;
  subtitle?: boolean;
  home?: boolean;
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  home,
  stage,
  endsAt,
  subtitle,
  nextGenStartsAt,
}) => {
  const nextGenReached = useTimeFlag(nextGenStartsAt);

  if (stage === GenerationStage.Quorum) {
    return (
      <Row gap="sm" items="center">
        <MonoText inline variant="body3" color="success">
          Voting stage staring soon...
        </MonoText>
      </Row>
    );
  }

  if (isVotingInProgress(stage)) {
    if (home) return null;
    return (
      <Row gap="sm" items="center">
        <MonoText inline variant="body3" color="success">
          Vote in progress...
        </MonoText>
      </Row>
    );
  }

  if (isSubmittingInProgress(stage)) {
    return (
      <Column gap="sm" items="center">
        <Row gap="sm">
          <Countdown date={endsAt} variant="body3" color="success" />
          <MonoText inline variant="body3" color="success">
            •
          </MonoText>
          <MonoText inline variant="body3" color="success">
            Remain to Submit & Support
          </MonoText>
        </Row>
        {subtitle ? (
          <MonoText variant="body3" color="secondary">
            First proposal to reach 15% support triggers the voting stage for
            that proposal
          </MonoText>
        ) : null}
      </Column>
    );
  }

  if (nextGenReached) {
    return (
      <Row gap="sm" items="center">
        <MonoText inline variant="body3" color="success">
          Starting new generation...
        </MonoText>
      </Row>
    );
  }

  return (
    <Row gap="sm" items="center">
      <Countdown date={nextGenStartsAt} variant="body3" color="success" />
      <MonoText variant="body3" color="success">
        •
      </MonoText>
      <MonoText variant="body3" color="success">
        Until next generation
      </MonoText>
    </Row>
  );
};
