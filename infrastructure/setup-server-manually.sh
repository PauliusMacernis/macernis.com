echo "This file includes instructions that have to be followed manually. Look into the file."
echo "No commands have been run by this script up to now. Exiting."
exit

########################################################################################################################
### SSH to the server passwordlessly
########################################################################################################################

# --- Client side
## Create the dir if does not exists, make sure you give the same permissions as ~/.ssh
cd ~/.ssh/private
ssh-keygen -t rsa -b 2048 -f "macernis.com" -P ""
scp macernis.com.pub root@mijr.l.dedikuoti.lt:/root/.ssh/macernis.com.pub
ssh root@mijr.l.dedikuoti.lt

# --- Server side
cat /root/.ssh/macernis.com.pub > /root/.ssh/authorized_keys
cat /root/.ssh/authorized_keys
rm /root/.ssh/macernis.com.pub

sudo sed -i 's/^/#/' /etc/ssh/sshd_config
cat /etc/ssh/sshd_config
echo "PasswordAuthentication no" >> /etc/ssh/sshd_config
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
echo "PubkeyAuthentication yes" >> /etc/ssh/sshd_config

systemctl restart sshd

exit

# --- Client side
ssh -i "~/.ssh/private/macernis.com" root@mijr.l.dedikuoti.lt

# --- Server side
exit

# --- Client side
echo "Host macernis.com" >> ~/.ssh/config && \
echo "    Hostname mijr.l.dedikuoti.lt" >> ~/.ssh/config && \
echo "    Port 22" >> ~/.ssh/config && \
echo "    User root" >> ~/.ssh/config && \
echo "    PasswordAuthentication=no" >> ~/.ssh/config && \
echo "    IdentitiesOnly=yes" >> ~/.ssh/config && \
echo "    IdentityFile ~/.ssh/private/macernis.com" >> ~/.ssh/config

ssh macernis.com

########################################################################################################################
### LAMP
########################################################################################################################

# --- Server side

sudo apt update
sudo apt install apache2

sudo ufw app list
sudo ufw allow in "Apache"
sudo ufw status
