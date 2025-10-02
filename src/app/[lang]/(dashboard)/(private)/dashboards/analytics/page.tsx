// MUI Imports
import Grid from '@mui/material/Grid2'

// Components Imports
import Transactions from '@views/dashboards/crm/Transactions'
import RevenueReport from '@views/dashboards/crm/RevenueReport'
import SalesOverview from '@views/dashboards/crm/SalesOverview'
import TotalSales from '@views/dashboards/crm/TotalSales'
import LineAreaChart from '@views/dashboards/crm/LineAreaChart'
import WeeklySales from '@views/dashboards/crm/WeeklySales'
import ActivityTimeline from '@views/dashboards/crm/ActivityTimeline'
import DeveloperMeetup from '@views/dashboards/crm/DeveloperMeetup'
import MeetingSchedule from '@views/dashboards/crm/MeetingSchedule'
import CardStatVertical from '@components/card-statistics/Vertical'
import UpgradePlan from '@views/dashboards/crm/UpgradePlan'

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 4 }}>
        <UpgradePlan />
      </Grid>
      <Grid size={{ xs: 12, md: 8, lg: 8 }}>
        <Transactions />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <WeeklySales />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <TotalSales />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <LineAreaChart />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CardStatVertical
              title='Total Profit'
              stats='$25.6k'
              avatarIcon='ri-pie-chart-2-line'
              avatarColor='secondary'
              subtitle='Weekly Profit'
              trendNumber='42%'
              trend='positive'
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CardStatVertical
              stats='862'
              trend='negative'
              trendNumber='18%'
              title='New Project'
              subtitle='Yearly Project'
              avatarColor='primary'
              avatarIcon='ri-file-word-2-line'
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <SalesOverview />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <RevenueReport />
      </Grid>
      <Grid size={{ xs: 12, lg: 8 }}>
        <DeveloperMeetup />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <MeetingSchedule />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 8 }}>
        <ActivityTimeline />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
