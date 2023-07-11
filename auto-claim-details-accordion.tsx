import React from 'react';
import {
  Table,
  DataTable,
  TableCell,
  TableRow,
  TableBody,
  BodyText,
  Heading,
  Tooltip,
  IconInfo,
  Disclaimer,
  //begin - added from property-claim-details-accordion
  Link,
  List,
  ListItem,
  //end- added from property-claim-details-accordion
} from '@lmig/lmds-react';
import { format, parseISO } from 'date-fns';
import './auto-claim-details-accordion.scss';
import { AutoClaim } from '../../graphql/auto-response-types';

//begin - added from property-claim-details-accordion
import { PropertyClaim, PropertyLossCause } from '../../graphql/property-claim-response-types';
import { BrandContext } from '@lmig/apptrove-ui-claims-common-util';
import './property-claim-details-accordion.scss';
//end- added from property-claim-details-accordion

export interface AutoClaimDetailsAccordionProps {
  claim: AutoClaim;
}

//begin - added from property-claim-details-accordion
export interface PropertyClaimDetailsAccordionProps {
  claim: PropertyClaim;
  handleShowDeductibleModal: () => void;
}
//end- added from property-claim-details-accordion

export const AutoClaimDetailsAccordion = ({ claim }: AutoClaimDetailsAccordionProps) => {
  return (
    <>
      <DataTable>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <BodyText type="default-medium">Claim Number</BodyText>
              </TableCell>
              <TableCell textAlign="right">
                <BodyText>{claim.claimNumber}</BodyText>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DataTable>
      <DataTable>
        <Heading type="h4-bold">Incident details</Heading>
        <Table>
          <TableBody>
            {claim.reportedDateET && (
              <TableRow>
                <TableCell>
                  <BodyText type="default-medium">Incident reported on*</BodyText>
                </TableCell>
                <TableCell textAlign="right">
                  <BodyText>{format(parseISO(claim.reportedDateET.slice(0, -1)), 'MMMM d, yyyy')}</BodyText>
                </TableCell>
              </TableRow>
            )}
            {claim.incidentDateET && (
              <TableRow>
                <TableCell>
                  <BodyText type="default-medium">Date of Incident</BodyText>
                </TableCell>
                <TableCell textAlign="right">
                  <BodyText>{format(parseISO(claim.incidentDateET.slice(0, -1)), 'MMMM d, yyyy')}</BodyText>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>
                <BodyText type="default-medium">Type of Incident</BodyText>
              </TableCell>
              <TableCell textAlign="right">
                <BodyText className="bodyText">{claim.cause}</BodyText>
              </TableCell>
            </TableRow>
            {claim.location && (
              <TableRow>
                <TableCell>
                  <BodyText type="default-medium">Incident location</BodyText>
                </TableCell>
                <TableCell textAlign="right">
                  <BodyText className="bodyText">
                    <div>{claim.location.streetAddress1}</div>
                    <div>{claim.location.streetAddress2}</div>
                    <div>
                      {claim.location.city}, {claim.location.state} {claim.location.zip}
                    </div>
                  </BodyText>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DataTable>
      <Disclaimer className="dateDisclaimer">
        <p>*All times and dates are displayed and adjusted for Eastern Time (ET).</p>
      </Disclaimer>
      {claim.vehicle && (
        <DataTable>
          <Heading type="h4-bold">Vehicle details</Heading>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <BodyText type="default-medium">Vehicle</BodyText>
                </TableCell>
                <TableCell textAlign="right">
                  <BodyText className="bodyText">
                    {claim.vehicle.year} {claim.vehicle.make} {claim.vehicle.model}
                  </BodyText>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <BodyText type="default-medium">Driver</BodyText>
                </TableCell>
                <TableCell textAlign="right">
                  <BodyText className="bodyText">{claim.vehicle.driver}</BodyText>
                </TableCell>
              </TableRow>
              {!!claim.vehicle.passengers?.length && (
                <TableRow>
                  <TableCell>
                    <BodyText type="default-medium">Passenger(s)</BodyText>
                  </TableCell>
                  <TableCell textAlign="right">
                    {claim.vehicle.passengers.map((passenger, index) => {
                      const key = index + passenger;
                      return (
                        <BodyText key={key} className="bodyText">
                          <p>{passenger}</p>
                        </BodyText>
                      );
                    })}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DataTable>
      )}
      <DataTable>
        <Heading type="h4-bold">Policy Details</Heading>
        <Table>
          <TableBody>
            {claim.policy && (
              <TableRow>
                <TableCell>
                  <BodyText type="default-medium">Policy Number</BodyText>
                </TableCell>
                <TableCell textAlign="right">
                  <BodyText>{claim.policy.policyNumber}</BodyText>
                </TableCell>
              </TableRow>
            )}
            {claim.autoSegment?.deductible?.verified && (
              <TableRow>
                <TableCell>
                  <Tooltip content="The amount you pay out of pocket towards replacement/repair costs.">
                    <span>
                      <BodyText type="default-medium">
                        <span>General deductible </span>
                        <span>
                          <IconInfo
                            size={{
                              base: '24',
                            }}
                          />
                        </span>
                      </BodyText>
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell textAlign="right">
                  <BodyText>${claim.autoSegment.deductible.amount}</BodyText>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DataTable>
    </>
  );
};
