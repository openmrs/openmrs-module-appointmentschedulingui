package org.openmrs.module.appointmentschedulingui;

import org.junit.Test;
import org.openmrs.test.BaseModuleContextSensitiveTest;

public class AppointmentSchedulingUIActivatorTest extends BaseModuleContextSensitiveTest {

    @Test
    public void testStartup() throws Exception {
        AppointmentSchedulingUIActivator activator = new AppointmentSchedulingUIActivator();
        activator.willRefreshContext();
        activator.contextRefreshed();
        activator.willStart();
        //activator.started();
    }
}

